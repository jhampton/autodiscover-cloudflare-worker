import handler from './handler'

// Main entry point in workers
addEventListener('fetch', (event) => {
  return event.respondWith(handler(event.request))
})
