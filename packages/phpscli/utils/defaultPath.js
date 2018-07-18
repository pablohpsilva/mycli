import { relative, join } from 'path'

const ROOT_PATH = '../'

export default (to) => relative(ROOT_PATH, to)

export const projectRootPath = (currentPath) => currentPath.split('/').reduce((acc) => join(acc, '..'),'')
