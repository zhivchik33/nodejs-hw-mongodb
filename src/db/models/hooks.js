
export const handleSaveError = (error, doc, next) => {
  error.status = 400;
  next(error);
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
