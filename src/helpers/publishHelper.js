const uuid = require("uuid/v1")
const _ = require("lodash");
const envVariables = require("../envVariables");
const axios = require("axios");

function getContentMetaData(contentId, reqHeaders){
  const url = `${envVariables.baseURL}/action/content/v3/read/${contentId}`;
  const option = {
    url: url,
    method: "get",
    headers: reqHeaders
  };
  return axios(option);
}

function getPublishContentEvent(metadata, textbookId, units) {
    metadata.pkgVersion = `${metadata.pkgVersion}.0`
    metadata = _.omit(metadata, [
      "downloadUrl",
      "variants",
      "previewUrl",
      "streamingUrl"
    ]);
    var ets = Date.now();
    var dataObj = {
      'eid': 'BE_JOB_REQUEST',
      'ets': ets,
      'mid': `LP.${ets}.${uuid()}`,
      'actor': {
        'id': 'Auto Creator',
        'type': 'System'
      },
      'context': {
        'pdata': {
          'ver': '1.0',
          'id': 'org.ekstep.platform'
        },
        'channel': metadata.channel,
        'env': envVariables.PUBLISH_ENV
      },
      'object': {
        'ver': '1.0',
        'id': metadata.identifier
      },
      'edata': {
        'action': 'auto-create',
        'iteration': 1,
        'objectType': 'Content',
        'repository': `${envVariables.baseURL}/api/content/v1/read/${metadata.identifier}`,
        'metadata': metadata,
        'textbookInfo': {
          'identifier': textbookId,
          'units': units
        }
      }
    }

    return dataObj;
  }


module.exports.getPublishContentEvent = getPublishContentEvent
module.exports.getContentMetaData = getContentMetaData