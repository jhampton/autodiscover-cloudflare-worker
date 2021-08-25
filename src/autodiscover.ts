import { TemplateSettings } from './types'
import autoDiscoverTemplate from './views/autodiscover.xml'
import { render } from 'mustache'

// Microsoft Outlook
export default (settings: TemplateSettings) =>
  async (req: Request): Promise<Response> => {
    const schema: string | null = req.bodyXml?.Autodiscover?.Request
      ?.AcceptableResponseSchema
      ? req.bodyXml?.Autodiscover?.Request?.AcceptableResponseSchema
      : req.bodyXml?.Autodiscover?.$?.xmlns
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

    const locals = {
      ...settings,
      schema,
      email,
      username,
      domain,
      imapenc,
      popenc,
      smtpenc,
    }
    const output = render(autoDiscoverTemplate, locals)

    return new Response(output, {
      headers: {
        'content-type': 'text/xml',
        'permissions-policy': 'interest-cohort=()',
        'referrer-policy': 'no-referrer',
        'expect-ct': 'max-age=600, enforce',
        'content-security-policy': "frame-ancestors 'none'",
      },
    })
  }
