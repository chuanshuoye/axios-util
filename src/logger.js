const loggerTypes = ["info", "warn", "error"];

const logger = (type = "info", params = {}) => {
  if (loggerTypes.indexOf(type) == -1) return;
  console[type](`请求API服务:`);
  console[type](params.type);
  if (params.more) {
    console[type](`请求API信息:`);
    console[type](
      isJSON(params.more) ? JSON.stringify(params.more) : params.more
    );
  }
  if (params.description) {
    console[type](`描述信息:`);
    console[type](
      isJSON(params.description)
        ? JSON.stringify(params.description)
        : params.description
    );
  }
};

function isJSON(obj) {
  try {
    JSON.stringify(obj);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = logger;
