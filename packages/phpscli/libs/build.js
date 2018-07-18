import Mustache from 'mustache'
import writeFile from '../utils/writeFile'

const TEMPLATE_PATH = '../templates'

const getFileExtension = ({ vue }) => {
  return vue
    ? 'vue'
    : 'js'
}

const getTemplate = (templatePath, framework, type, append = '-comp') => {
  return require(`${templatePath}/${framework}/${type}${append}`).default
}

export default async (framework, options) => {
  const { name, test, dest } = options
  if (!dest || !name) {
    console.log('Could not create amazing stuff due to some arguments missing: either name or dest')
    return
  }

  const data = Mustache.render(getTemplate(TEMPLATE_PATH, framework, 'class'), options)
  writeFile(data, name, getFileExtension(options), dest)

  if (test) {
    const test = Mustache.render(getTemplate(TEMPLATE_PATH, framework, 'test'), options)
    writeFile(test, name, 'test.js', dest)
  }

}
