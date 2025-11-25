import * as Sentry from '@sentry/nestjs'

Sentry.init({
  dsn: 'https://cc249fc693e44c2f432bdb8265e6a600@o4510425585221632.ingest.us.sentry.io/4510425587974144',
  sendDefaultPii: true,
})
