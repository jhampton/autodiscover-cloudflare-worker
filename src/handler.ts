import { Router, Method, Params } from 'tiny-request-router'
import xmlBodyParser from './utils/xmlBodyParser'
import autodiscover from './autodiscover'
import settings from './settings'

const router = new Router()
// router.get('/worker', async () => new Response('Hi from worker!'))
// router.get(
//   '/hello/:name',
//   async (params: Params) => new Response(`Hello ${params.name}!`),
// )
// router.post('/test', async () => new Response('Post received!'))

// ******  Autodiscover Routes
const autodiscoverParsedXML = xmlBodyParser(autodiscover(settings))
// Outlook
router.get('/autodiscover/autodiscover.xml', autodiscoverParsedXML)
router.post('/autodiscover/autodiscover.xml', autodiscoverParsedXML)
router.get('/Autodiscover/Autodiscover.xml', autodiscoverParsedXML)
router.post('/Autodiscover/Autodiscover.xml', autodiscoverParsedXML)
// Thunderbird
router.get('/mail/config-v1.1.xml', autodiscoverParsedXML)

export default (request: Request) => {
  const { pathname } = new URL(request.url)

  const match = router.match(request.method as Method, pathname)
  if (match) {
    return match.handler(request, match.params)
  } else {
    return new Response('', { status: 404 })
  }
}
