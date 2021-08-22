import { Router, Method, RouteMatch } from 'tiny-request-router'
import xmlBodyParser from './utils/xmlBodyParser'
import autodiscover from './autodiscover'
import mobileconfig from './mobileconfig'
import autoconfig from './autoconfig'
import settings from './settings'

const router = new Router()

// *** Auto Discover Routes
const autodiscoverParsedXML = xmlBodyParser(autodiscover(settings))

// Microsoft Outlook
router.get('/autodiscover/autodiscover.xml', autodiscoverParsedXML)
router.post('/autodiscover/autodiscover.xml', autodiscoverParsedXML)
router.get('/Autodiscover/Autodiscover.xml', autodiscoverParsedXML)
router.post('/Autodiscover/Autodiscover.xml', autodiscoverParsedXML)

// Mozilla Thunderbird
router.get('/mail/config-v1.1.xml', autoconfig(settings))

// Apple iOS / Mail (/email.mobileconfig?email=username@domain.com or /email.mobileconfig?email=username)
router.get('/email.mobileconfig', mobileconfig(settings))

export default (request: Request) => {
  const { pathname } = new URL(request.url)
  const match: RouteMatch<any> | null = router.match(request.method as Method, pathname)
  if (match) {
    return match.handler(request, match.params)
  } else {
    return new Response('', { status: 404 })
  }
}
