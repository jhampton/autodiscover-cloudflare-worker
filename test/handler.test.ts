import handleRequest from '../src/handler'
import makeServiceWorkerEnv from 'service-worker-mock'
import autodiscoverFixture from './autodiscover.fixure'

declare var global: any

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

  test('Test Autodiscover URLs', async () => {
    const testRequest = new Request(
      'http://company.com/autodiscover/autodiscover.xml',
      {
        method: 'GET',
        body: autodiscoverFixture,
        headers: { 'Content-type': 'application/xml' },
      },
    )
    const result = await handleRequest(testRequest)
    expect(result.status).toEqual(200)
    const text = await result.text()
    expect(text).toMatchSnapshot('Autodiscover')
  })
})
