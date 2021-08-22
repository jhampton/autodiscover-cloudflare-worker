import handleRequest from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'
import autodiscoverFixture from './autodiscover.fixure'

declare var global: any

const autodiscoverUrls = [
  { method: 'GET', url: '/autodiscover/autodiscover.xml' },
  { method: 'POST', url: '/autodiscover/autodiscover.xml' },
  { method: 'GET', url: '/Autodiscover/Autodiscover.xml' },
  { method: 'POST', url: '/Autodiscover/Autodiscover.xml' },
]

// SET ENV VARS - jestConfig

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('Expect 404 for root', async () => {
    const result = await handleRequest(
      new Request('/', {
        method: 'GET',
        body: autodiscoverFixture,
        headers: { 'Content-type': 'text/xml' },
      }),
    )
    expect(result.status).toEqual(404)
  })

  // Test all variations of Autodiscover routes
  autodiscoverUrls.map((route) => {
    test(`Test Autodiscover URL ${route.url} with method ${route.method}`, async () => {
      const testRequest = new Request(`http://company.com${route.url}`, {
        method: route.method,
        body: autodiscoverFixture,
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

  test(`Test Mobileconfig URL with method GET`, async () => {
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

  test(`Test Autoconfig URL with method GET`, async () => {
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
