import { TemplateSettings } from './types'
import autoDiscoverTemplate from './views/autodiscover.xml'
import swig from 'swig-templates'

// Microsoft Outlook
export default (settings: TemplateSettings) =>
  async (req: Request): Promise<Response> => {
    const schema: string | null =
      req.bodyXml?.Autodiscover?.Request?.AcceptableResponseSchema
    const xmlns: string | null = schema !== null ? schema :
      req.bodyXml?.Autodiscover?.$?.xmlns
    let email: string | null = req.bodyXml?.Autodiscover?.Request?.EMailAddress

    let username
    let domain
    if (email === null) {
      email = ''
      username = ''
      domain = settings.domain
    } else if (~email.indexOf('@')) {
      username = email.split('@')[0]
      domain = email.split('@')[1]
    } else {
      username = email
      domain = settings.domain
      email = username + '@' + domain
    }

    const imapenc =
      settings?.imap?.socket === 'STARTTLS' ? 'TLS' : settings?.imap?.socket
    const popenc =
      settings?.pop?.socket === 'STARTTLS' ? 'TLS' : settings?.pop?.socket
    const smtpenc =
      settings.smtp.socket === 'STARTTLS' ? 'TLS' : settings.smtp.socket

    const compiledTemplate = swig.compile(autoDiscoverTemplate)
    const locals = {
      ...settings,
      schema: xmlns,
      email,
      username,
      domain,
      imapenc,
      popenc,
      smtpenc,
    }
    const output = compiledTemplate(locals)

    return new Response(output, {
      headers: { 'content-type': 'application/xml' },
    })
  }
