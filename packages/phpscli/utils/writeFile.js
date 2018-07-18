import {
  ShellString,
  test,
  mkdir,
  cd
} from 'shelljs'
import { projectRootPath } from './defaultPath'

const writeFile = (fileContent, fileName, fileExtension, path) => {
  const candidateFileName = `${fileName}.${fileExtension}`
  const dataPath = `${path}/${fileName}`

  if (!test('-e', dataPath) || !test('-e', `${dataPath}.${fileExtension}`) ) {
    mkdir('-p', dataPath)
    cd(dataPath)
    new ShellString(fileContent).to(`${candidateFileName}`)

    cd(projectRootPath(dataPath))
    return
  }

  console.warn('This component already exists')
}


export default writeFile
