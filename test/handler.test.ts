import handleRequest from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'
import autoDiscoverFixture from './autodiscover.fixture'
import autoDiscoverBlankAcceptableSchemaFixture from './autodiscover-blank-acceptable-schema.fixture'
import autoDiscoverMissingAcceptableSchemaFixture from './autodiscover-missing-acceptable-schema.fixture'
autoDiscoverMissingAcceptableSchemaFixture

declare let global: unknown

const autodiscoverUrls = [
  { method: 'GET', url: '/autodiscover/autodiscover.xml' },
  { method: 'POST', url: '/autodiscover/autodiscover.xml' },
  { method: 'GET', url: '/Autodiscover/Autodiscover.xml' },
  { method: 'POST', url: '/Autodiscover/Autodiscover.xml' },
]

const autoDiscoverFixtures = [
  { name: 'Expected', fixture: autoDiscoverFixture },
  {
    name: 'Blank AcceptableSchema',
    fixture: autoDiscoverBlankAcceptableSchemaFixture,
  },
  {
    name: 'Missing AcceptableSchema',
    fixture: autoDiscoverMissingAcceptableSchemaFixture,
  },
]

// SET ENV VARS - jestConfig
describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  it('Expect 404 for root', async () => {
    const result = await handleRequest(
      new Request('/', {
        method: 'GET',
        body: autoDiscoverFixture,
        headers: { 'Content-type': 'text/xml' },
      }),
    )
    expect(result.status).toEqual(404)
  })

  // Test all variations of Autodiscover routes with all fixtures
  autoDiscoverFixtures.map((fixture) => {
    autodiscoverUrls.map((route) => {
      test(`Test Autodiscover URL ${route.url} with method ${route.method} and fixture ${fixture.name}`, async () => {
        const testRequest = new Request(`http://company.com${route.url}`, {
          method: route.method,
          body: fixture.fixture,
          headers: { 'Content-type': 'application/xml' },
        })
        const result = await handleRequest(testRequest)
        expect(result.status).toEqual(200)
        const text = await result.text()
        expect(text).toMatchSnapshot(
          `${route.method}-${route.url.replace('/', '-')}`,
        )
      })
    })
  })

  it(`Test Mobileconfig URL with method GET`, async () => {
    const testRequest = new Request(
      `http://company.com/email.mobileconfig?email=username@domain.com`,
      {
        method: 'GET',
        body: '',
        headers: { 'Content-type': 'text' },
      },
    )
    const result = await handleRequest(testRequest)
    expect(result.status).toEqual(200)
    const text = await result.text()
    expect(text).toMatchSnapshot(`Mobileconfig`)
  })

  it(`Test Autoconfig URL with method GET`, async () => {
    const testRequest = new Request(`http://company.com/mail/config-v1.1.xml`, {
      method: 'GET',
      body: '',
      headers: { 'Content-type': 'text' },
    })
    const result = await handleRequest(testRequest)
    expect(result.status).toEqual(200)
    const text = await result.text()
    expect(text).toMatchSnapshot(`Mobileconfig`)
  })
})
