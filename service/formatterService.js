exports.responseDataFormat = (result, message, data) => {
  return {
    result: result,
    message: message,
    data: data,
  };
};

exports.responseNoDataFormat = (result, message) => {
  return {
    result: result,
    message: message,
  };
};
