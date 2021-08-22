import { TemplateSettings } from './types'
import mobileconfigTemplate from './views/mobileconfig.xml'
import swig from 'swig-templates'

// Function to parse query strings
const getParameterByName = (name: string, url: string) => {
  name = name.replace(/[[\]]/g, '\\$&')
  name = name.replace(/\//g, '')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)

  if (!results) return null
  else if (!results[2]) return ''
  else if (results[2]) {
    results[2] = results[2].replace(/\//g, '')
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// Apple iOS / Mail (/email.mobileconfig?email=username@domain.com or /email.mobileconfig?email=username)
export default (settings: TemplateSettings) =>
  async (req: Request): Promise<Response> => {
    const emailParam = getParameterByName('email', req.url) || null

    // Return 400, because we need an email to generate the response
    if (!emailParam) {
      return new Response('', { status: 400 })
    }

    let username, domain, email
    if (~emailParam.indexOf('@')) {
      email = emailParam
      username = emailParam.split('@')[0]
      domain = emailParam.split('@')[1]
    } else {
      username = emailParam
      domain = settings.domain
      email = username + '@' + domain
    }

    const contentDispositionFileName = `${domain}.mobileconfig`

    const imapssl =
      settings.imap.socket === 'SSL' || settings.imap.socket === 'STARTTLS'
        ? 'true'
        : 'false'
    const popssl =
      settings.pop.socket === 'SSL' || settings.pop.socket === 'STARTTLS'
        ? 'true'
        : 'false'
    const smtpssl =
      settings.smtp.socket === 'SSL' || settings.smtp.socket === 'STARTTLS'
        ? 'true'
        : 'false'
    const ldapssl =
      settings.ldap.socket === 'SSL' || settings.ldap.port === 636
        ? 'true'
        : 'false'

    const compiledTemplate = swig.compile(mobileconfigTemplate)
    const output = compiledTemplate({
      ...settings,
      email,
      username,
      domain,
      imapssl,
      popssl,
      smtpssl,
      ldapssl,
    })

    return new Response(output, {
      headers: {
        'Content-Type': 'application/x-apple-aspen-config; charset=utf-8',
        'Content-Disposition': `attachment; filename="${contentDispositionFileName}"`,
      },
    })
  }
