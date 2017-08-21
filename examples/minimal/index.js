var Metrics = require('../../dist')

const metrics = Metrics('1d91d12a45')

module.exports = metrics(() => 'micro response')
