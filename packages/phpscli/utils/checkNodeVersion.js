const chalk = require('chalk')
const semver = require('semver')

// export default function checkNodeVersion (id, wanted ) {
function checkNodeVersion (id, wanted ) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      'requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

module.exports = checkNodeVersion
