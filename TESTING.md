# Testing & Validation Guide

## Automated Testing Setup

### Unit Tests

```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Run unit tests
npm run test:unit

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui
```

### Test Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,ts}',
    '!**/*.d.ts',
  ],
}
```

```javascript
// jest.setup.js
import '@testing-library/jest-dom'
```

## Manual Testing Checklist

### Pre-deployment Testing

#### 1. Development Environment

- [ ] Application starts without errors
- [ ] Database connection works
- [ ] Admin user can be seeded
- [ ] Authentication flow works
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Email sending works (check logs)
- [ ] File uploads work
- [ ] Error pages display correctly

#### 2. Build Process

```bash
# Test production build
npm run build

# Test production start
npm run start

# Test health endpoint
curl http://localhost:3000/api/health
```

#### 3. Database Testing

```bash
# Test database operations
npm run db:studio

# Test seeding
npm run db:seed

# Test migrations
npm run db:push
```

### Production Testing

#### 1. Staging Environment

Deploy to staging and test:

- [ ] Domain resolves correctly
- [ ] SSL certificate is valid
- [ ] All pages load over HTTPS
- [ ] Authentication works
- [ ] Database operations work
- [ ] Email sending works
- [ ] File uploads work
- [ ] Admin dashboard accessible
- [ ] Error handling works

#### 2. Production Deployment

Before going live:

- [ ] Database backup created
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Team notified of deployment

After deployment:

- [ ] Site loads correctly
- [ ] All functionality works
- [ ] Performance monitoring active
- [ ] Error tracking working
- [ ] Analytics configured

## API Testing

### Health Checks

```bash
# Basic health check
curl -f https://yourdomain.com/api/health

# Detailed health check
curl -s https://yourdomain.com/api/health | jq .
```

### Authentication Testing

```bash
# Test login endpoint
curl -X POST https://yourdomain.com/api/auth/signin/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@domain.com","password":"password"}'

# Test protected route
curl -H "Cookie: session-token" https://yourdomain.com/dashboard
```

### CRUD Operations Testing

```bash
# Test posts API
curl -X GET https://yourdomain.com/api/posts

# Create post
curl -X POST https://yourdomain.com/api/posts \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token" \
  -d '{"title":"Test","content":"Content","status":"DRAFT"}'

# Update post
curl -X PUT https://yourdomain.com/api/posts/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token" \
  -d '{"title":"Updated","status":"PUBLISHED"}'

# Delete post
curl -X DELETE https://yourdomain.com/api/posts/1 \
  -H "Cookie: session-token"
```

### Email Testing

```bash
# Test contact form
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "message": "This is a test message"
  }'
```

### File Upload Testing

```bash
# Test presigned URL generation
curl "https://yourdomain.com/api/uploads/presign?filename=test.jpg"

# Upload file to S3
curl -X PUT -T test.jpg "presigned-url-here"
```

## Performance Testing

### Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse https://yourdomain.com --output=json --output-path=./lighthouse-report.json

# Desktop audit
lighthouse https://yourdomain.com --preset=desktop
```

### Load Testing

```bash
# Install Artillery
npm install -g artillery

# Create load test
# artillery.yml
config:
  target: 'https://yourdomain.com'
  phases:
    - duration: 60
      arrivalRate: 10
  defaults:
    headers:
      Content-Type: 'application/json'

scenarios:
  - name: 'Health check'
    requests:
      - get:
          url: '/api/health'

# Run load test
artillery run artillery.yml
```

### Core Web Vitals Monitoring

```javascript
// Monitor CWV in browser console
webVitals.getCLS(console.log)
webVitals.getFID(console.log)
webVitals.getFCP(console.log)
webVitals.getLCP(console.log)
webVitals.getTTFB(console.log)
```

## Security Testing

### Basic Security Checks

```bash
# Test SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Check security headers
curl -I https://yourdomain.com

# Test rate limiting
for i in {1..15}; do curl -s https://yourdomain.com/api/health; done

# Test XSS protection
curl "https://yourdomain.com/api/health?<script>alert(1)</script>"
```

### Penetration Testing

```bash
# Use OWASP ZAP or Burp Suite for comprehensive testing
# Check for:
# - SQL injection vulnerabilities
# - XSS vulnerabilities
# - CSRF vulnerabilities
# - Insecure direct object references
# - Security misconfigurations
```

## Browser Testing

### Cross-browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Testing

Test breakpoints:
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)

## Monitoring Setup

### Application Monitoring

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

### Performance Monitoring

```typescript
// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

### Uptime Monitoring

Use services like:
- **UptimeRobot**: HTTP monitoring
- **Pingdom**: Advanced monitoring
- **New Relic**: Application performance
- **DataDog**: Comprehensive monitoring

## Automated Test Scripts

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

URL=$1
if [ -z "$URL" ]; then
  echo "Usage: $0 <url>"
  exit 1
fi

echo "Testing $URL..."

# Test homepage
if curl -f -s "$URL" > /dev/null; then
  echo "✓ Homepage loads"
else
  echo "✗ Homepage failed"
  exit 1
fi

# Test health endpoint
if curl -f -s "$URL/api/health" > /dev/null; then
  echo "✓ Health check passes"
else
  echo "✗ Health check failed"
  exit 1
fi

# Test contact form
if curl -f -s -X POST "$URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}' > /dev/null; then
  echo "✓ Contact API works"
else
  echo "✗ Contact API failed"
fi

echo "Health check complete"
```

### Deployment Verification Script

```bash
#!/bin/bash
# verify-deployment.sh

URL=$1
EXPECTED_VERSION=$2

if [ -z "$URL" ] || [ -z "$EXPECTED_VERSION" ]; then
  echo "Usage: $0 <url> <expected-version>"
  exit 1
fi

echo "Verifying deployment at $URL..."

# Check version
VERSION=$(curl -s "$URL/api/health" | jq -r '.version // "unknown"')
if [ "$VERSION" = "$EXPECTED_VERSION" ]; then
  echo "✓ Version check passed: $VERSION"
else
  echo "✗ Version mismatch: expected $EXPECTED_VERSION, got $VERSION"
  exit 1
fi

# Check database
if curl -f -s "$URL/api/health" | jq -e '.database == "connected"' > /dev/null; then
  echo "✓ Database connection verified"
else
  echo "✗ Database connection failed"
  exit 1
fi

echo "Deployment verification complete"
```

## Test Data Management

### Test User Creation

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create test users
  const testUsers = [
    {
      email: 'admin@test.com',
      name: 'Test Admin',
      role: 'ADMIN',
      password: 'TestPass123!',
    },
    {
      email: 'user@test.com',
      name: 'Test User',
      role: 'USER',
      password: 'TestPass123!',
    },
  ]

  for (const user of testUsers) {
    const hashedPassword = await hash(user.password, 12)
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        role: user.role as 'ADMIN' | 'USER',
        passwordHash: hashedPassword,
      },
    })
  }

  // Create test posts
  await prisma.post.createMany({
    data: [
      {
        title: 'Welcome to Growth Grid',
        content: 'This is a test post to demonstrate the platform.',
        status: 'PUBLISHED',
        authorId: (await prisma.user.findFirst({ where: { role: 'ADMIN' } }))!.id,
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

## Continuous Testing

### GitHub Actions Integration

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - run: npm run test:unit
      - run: npm run test:e2e
```

### Quality Gates

- [ ] All tests pass
- [ ] Code coverage > 80%
- [ ] No ESLint errors
- [ ] TypeScript compilation succeeds
- [ ] Lighthouse score > 90
- [ ] Security scan passes
- [ ] Bundle size within limits

## Final Checklist

### Pre-launch

- [ ] All automated tests pass
- [ ] Manual testing complete
- [ ] Performance benchmarks met
- [ ] Security audit passed
- [ ] Documentation updated
- [ ] Team trained on system
- [ ] Rollback plan documented
- [ ] Monitoring configured

### Post-launch

- [ ] Site loads correctly
- [ ] Users can register/login
- [ ] Core functionality works
- [ ] Error tracking active
- [ ] Performance monitoring active
- [ ] Support channels ready
- [ ] Incident response plan ready
