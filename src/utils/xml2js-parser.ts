import { Parser } from 'xml2js'

const xml2jsParser = new Parser({ explicitArray: false })

export default xml2jsParser.parseStringPromise
