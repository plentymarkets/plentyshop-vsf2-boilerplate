const { resolve } = require('path');

module.exports = function PaymentPaypalProvider(moduleOptions) {
  const { pp } = this.options;
  const options = {
    ...pp,
    ...moduleOptions
  };
    
  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    options
  })
};

module.exports.meta = require('../package.json');