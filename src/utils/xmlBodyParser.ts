import parseXmlAsync from './xml2js-parser'

export default (handler: (newReq: Request) => Promise<any>) =>
  async (req: Request): Promise<Response> => {
    try {
      req.bodyXml = await parseXmlAsync(await req.text())
    } catch (error) {
      req.bodyXml = {
        __ERROR__: error,
      }
    }

    return await handler(req)
  }
