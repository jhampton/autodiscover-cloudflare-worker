import { TemplateSettings } from './types'
import autoconfigTemplate from './views/autoconfig.xml'
import swig from 'swig-templates'

// Mozilla Thunderbird
export default (settings: TemplateSettings) =>
  async (): Promise<Response> => {
    const compiledTemplate = swig.compile(autoconfigTemplate)
    const output = compiledTemplate({ ...settings })

    return new Response(output, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
