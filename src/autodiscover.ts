import { TemplateSettings } from './types'
import autodiscoverTemplate from './views/autodiscover.xml'
import swig from 'swig-templates'

export default (settings: TemplateSettings) =>
  async (req: Request): Promise<Response> => {
    // Microsoft Outlook / Apple Mail

    const schema: string | null =
      req.bodyXml?.Autodiscover?.Request?.AcceptableResponseSchema
    const xmlns: string | null = req.bodyXml?.Autodiscover?.$?.xmlns
    let email: string | null = req.bodyXml?.Autodiscover?.Request?.EMailAddress

    let username
    let domain
    if (email === null) {
      email = ''
      username = ''
      domain = settings.domain
    } else if (~email.indexOf('@')) {
      email = email
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

    const compiledTemplate = swig.compile(autodiscoverTemplate)
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
