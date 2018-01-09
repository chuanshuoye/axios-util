const AxiosConfig = require("../axios.config.json");
const axios = require("axios");
const request = require("./request");

//set default axios configs
axios.create({
  timeout: AxiosConfig.timeout,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": AxiosConfig.contentType
  }
});

module.exports = {
  request
}
