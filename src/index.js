import Metrics from 'metrics-core'

let metrics

const middleware = fn => (req, res) => {
  if (req.url.indexOf('favicon') !== -1) return ''
  const startTime = new Date()
  const end = res.end
  res.end = (chunk, encoding, callback) => {
    res.end = end
    const endTime = new Date()
    const delta = endTime - startTime
    metrics.writeRequest({
      duration: delta,
      path: req.url,
      status: res.statusCode
    })

    return res.end(chunk, encoding, callback)
  }
  return fn(req, res)
}

module.exports = apikey => {
  metrics = new Metrics(apikey)
  return middleware
}
