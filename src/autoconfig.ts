import { TemplateSettings } from './types'
import autoconfigTemplate from './views/autoconfig.xml'
import { render } from 'mustache'

// Mozilla Thunderbird
export default (settings: TemplateSettings) => async (): Promise<Response> => {
  const output = render(autoconfigTemplate, {
    ...settings,
  })

  return new Response(output, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
