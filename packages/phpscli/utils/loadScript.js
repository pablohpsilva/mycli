import defaultPath from '../utils/defaultPath'

const loadScript = (path) => {
  const script = require(defaultPath(path))
  return Object.prototype.hasOwnProperty.call(script, 'default')
    ? script.default
    : script
}

module.exports = loadScript
