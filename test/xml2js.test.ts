import parseStringPromise from '../src/utils/xml2js-parser'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoDiscoverFixture = require('./autodiscover.fixture').default

describe('Make sure we can parse an Autodiscover _raw_ request text', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('Will return nested properties', async () => {
    let bodyAsJson: any = {}
    try {
      bodyAsJson = await parseStringPromise(autoDiscoverFixture)
    } catch (error) {
      console.error(error)
      expect(false)
    }

    expect(bodyAsJson).toHaveProperty('Autodiscover.$.xmlns')
  })

  it('Can find an email address', async () => {
    let bodyAsJson: any = {}
    try {
      bodyAsJson = await parseStringPromise(autoDiscoverFixture)
    } catch (error) {
      console.error(error)
    }
    expect(bodyAsJson.Autodiscover.Request.EMailAddress).toEqual(
      'user@contoso.com',
    )
  })

  it('Can find an AcceptableResponseSchema', async () => {
    let bodyAsJson: any = {}
    try {
      bodyAsJson = await parseStringPromise(autoDiscoverFixture)
    } catch (error) {
      console.error(error)
    }
    expect(bodyAsJson.Autodiscover.Request.AcceptableResponseSchema).toEqual(
      'http://schemas.microsoft.com/exchange/autodiscover/outlook/responseschema/2006a',
    )
  })
})
