exports.successResponseFormat = (message, data) => {
  return {
    result: "success",
    message: message,
    data: data,
  };
};

exports.failureResponseFormat = (message) => {
  return {
    result: "failure",
    message: message,
  };
};
