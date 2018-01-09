const axios = require("axios");
const logger = require("./logger");

const request = ({ url = "", method = "post", query = {}, data = {} }) => {
  return axios
    .request({
      url,
      method,
      data: query || data
    })
    .then(res => {
      logger("info", {
        type: url,
        more: query || data,
        description: res.data
      });
      return res.data;
    })
    .catch(err => {
      logger("error", {
        type: url,
        more: query || data,
        description:err.message
      });
      return err;
    });
};

module.exports = request;
