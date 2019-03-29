const testGet = (req, res) => {
  console.log('get');
  res.status(200).json({ get: true });
};

const testPost = (req, res) => {
  res.status(200).json({ post: true });
};

module.exports = {
  testGet,
  testPost,
};
