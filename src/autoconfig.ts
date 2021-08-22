import { TemplateSettings } from './types'
import autoconfigTemplate from './views/autoconfig.xml'
import swig from 'swig-templates'

export default (settings: TemplateSettings) =>
  async (req: Request): Promise<Response> => {
    const compiledTemplate = swig.compile(autoconfigTemplate)
    const output = compiledTemplate({
      ...settings,
    })

    return new Response(output, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
