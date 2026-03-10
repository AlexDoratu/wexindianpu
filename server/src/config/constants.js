const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

module.exports = {
  PORT,
  DATA_DIR
};
