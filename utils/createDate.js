const createDate = () => {
  var date = new Date();
  return (FullDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
};

module.exports = createDate;