const checkNodeVersion = require('./utils/checkNodeVersion')
const loadScript = require('./utils/loadScript')
const packageJSON = require('./package.json')
const requiredNodeVersion = packageJSON.engines.node
const version = packageJSON.version
const program = require('commander')

function getFramework ({ angular, vue }) {
  return angular
    ? 'angular'
    : vue
      ? 'vue'
      : 'react'
}

checkNodeVersion('flamecli', requiredNodeVersion)

program
  .version(version, '-v, --version')

program
  .command('build')
  .description('build a .js or .vue file in production mode with zero config')
  .option('-n, --name <name>', 'name for lib or web-component mode (default: Cow)', 'Cow')
  .option('-d, --dest <dir>', 'output directory (default: src)', './src/components')
  .option('-r, --react', 'build something for react')
  .option('-v, --vue', 'build something for vue')
  .option('-a, --angular', 'build something for angular')
  .option('-x, --flux', 'set redux flag')
  .option('-b, --airbnb', 'set airbnb flag')
  .option('-y, --functional', 'create functional stuff (if it can...)')
  .option('-t, --test', 'set test flag (this will build some tests for ya (if it can...))')
  .action((cmd) => {
    const args = cleanArgs(cmd)
    loadScript('libs/build.js')(getFramework(args), args)
  })

program.parse(process.argv)
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '')
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function') {
      args[key] = cmd[key]
    }
  })
  return args
}
