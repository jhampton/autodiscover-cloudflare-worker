import { Router, Method, Params } from 'tiny-request-router'
import xmlBodyParser from './utils/xmlBodyParser'
import autodiscover from './autodiscover'
import settings from './settings'
import handler from './handler'

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

// Main entry point in workers
addEventListener('fetch', (event) => {
  return event.respondWith(handler(event.request))
})

// iOS / Apple Mail (/email.mobileconfig?email=username@domain.com or /email.mobileconfig?email=username)
// router.get('/email.mobileconfig', function* autoconfig() {

// router.get('/email.mobileconfig', function* autoconfig() {
//   let email = this.request.query.email

//   if (!email) {
//     this.status = 400

//     return
//   }

//   let username
//   let domain
//   if (~email.indexOf('@')) {
//     username = email.split('@')[0]
//     domain = email.split('@')[1]
//   } else {
//     username = email
//     domain = settings.domain
//     email = username + '@' + domain
//   }

//   const filename = `${domain}.mobileconfig`

//   const imapssl =
//     settings.imap.socket === 'SSL' || settings.imap.socket === 'STARTTLS'
//       ? 'true'
//       : 'false'
//   const popssl =
//     settings.pop.socket === 'SSL' || settings.pop.socket === 'STARTTLS'
//       ? 'true'
//       : 'false'
//   const smtpssl =
//     settings.smtp.socket === 'SSL' || settings.smtp.socket === 'STARTTLS'
//       ? 'true'
//       : 'false'
//   const ldapssl =
//     settings.ldap.socket === 'SSL' || settings.ldap.port === '636'
//       ? 'true'
//       : 'false'

//   this.set('Content-Type', 'application/x-apple-aspen-config; charset=utf-8')
//   this.set('Content-Disposition', `attachment; filename="${filename}"`)

//   yield this.render('mobileconfig', {
//     email,
//     username,
//     domain,
//     imapssl,
//     popssl,
//     smtpssl,
//     ldapssl,
//   })
// })

// GENERIC SUPPORT PAGE
// router.get('/', function* index() {
//   yield this.render('index.html')
// })

// FAVICON
// router.get('/favicon.ico', function* icon() {
//   yield this.render('favicon.ico')
// })

// app.context.render = swig({
//   root: path.join(__dirname, 'views'),
//   autoescape: true,
//   cache: 'memory',
//   ext: 'xml',
//   locals: settings,
// })

// app.use(function* fixContentType(next) {
//   let type = this.request.headers['content-type']

//   if (type && type.indexOf('text/xml') === 0) {
//     let newType = type.replace('text/xml', 'application/xml')

//     this.request.headers['content-type'] = newType
//   }

//   yield next
// })
