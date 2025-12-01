# Environment Configuration Guide

## Environment Variables Reference

### Production Environment Variables

```bash
# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Database Configuration
DATABASE_URL=postgresql://user:password@host:5432/db?sslmode=require

# Authentication Configuration
AUTH_SECRET=your-32-character-production-secret
NEXTAUTH_URL=https://yourdomain.com
AUTH_TRUST_HOST=true

# Email Configuration (SendGrid)
SENDGRID_API_KEY=SG.your-production-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_TO_EMAIL=hello@yourdomain.com

# File Upload Configuration (AWS S3)
AWS_ACCESS_KEY_ID=your-production-aws-key
AWS_SECRET_ACCESS_KEY=your-production-aws-secret
AWS_REGION=us-east-1
UPLOADS_BUCKET_NAME=your-production-bucket-name

# Monitoring Configuration (Optional)
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
VERCEL_ANALYTICS_ID=your-vercel-analytics-id

# Database Seeding Configuration
SEED_ADMIN_EMAIL=admin@yourdomain.com
SEED_ADMIN_PASSWORD=ChangeMeImmediatelyAfterFirstLogin!

# Security Configuration
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
```

### Staging Environment Variables

```bash
# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com

# Database Configuration
DATABASE_URL=postgresql://user:password@staging-host:5432/db?sslmode=require

# Authentication Configuration
AUTH_SECRET=your-staging-32-character-secret
NEXTAUTH_URL=https://staging.yourdomain.com
AUTH_TRUST_HOST=true

# Email Configuration (use test keys)
SENDGRID_API_KEY=SG.your-staging-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@staging.yourdomain.com
SENDGRID_TO_EMAIL=staging@yourdomain.com

# File Upload Configuration
AWS_ACCESS_KEY_ID=your-staging-aws-key
AWS_SECRET_ACCESS_KEY=your-staging-aws-secret
AWS_REGION=us-east-1
UPLOADS_BUCKET_NAME=your-staging-bucket-name

# Monitoring Configuration
SENTRY_DSN=https://your-staging-sentry-dsn@sentry.io/project-id
VERCEL_ANALYTICS_ID=your-staging-vercel-analytics-id

# Database Seeding Configuration
SEED_ADMIN_EMAIL=staging-admin@yourdomain.com
SEED_ADMIN_PASSWORD=StagingPassword123!

# Security Configuration (relaxed for testing)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

### Development Environment Variables

```bash
# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/growthgrid_dev

# Authentication Configuration
AUTH_SECRET=development-secret-key-32-characters
NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=false

# Email Configuration (use SendGrid sandbox)
SENDGRID_API_KEY=SG.your-development-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@localhost
SENDGRID_TO_EMAIL=dev@yourdomain.com

# File Upload Configuration (use local or test S3)
AWS_ACCESS_KEY_ID=your-dev-aws-key
AWS_SECRET_ACCESS_KEY=your-dev-aws-secret
AWS_REGION=us-east-1
UPLOADS_BUCKET_NAME=your-dev-bucket-name

# Database Seeding Configuration
SEED_ADMIN_EMAIL=dev@yourdomain.com
SEED_ADMIN_PASSWORD=DevPassword123!

# Security Configuration (relaxed for development)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=1000
```

## Setting Up Environment Variables

### Vercel Dashboard

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with appropriate values
4. Set environment scope (Production, Preview, Development)

### Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in development values
3. Never commit `.env.local` to version control

### Docker Environment

```yaml
# docker-compose.yml
environment:
  - NODE_ENV=production
  - DATABASE_URL=${DATABASE_URL}
  - NEXTAUTH_SECRET=${AUTH_SECRET}
  - NEXTAUTH_URL=${NEXTAUTH_URL}
  - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
  # ... other variables
```

## Environment-Specific Configuration

### Database Connection

**Production**: Use connection pooling with Neon/PlanetScale
```bash
DATABASE_URL=postgresql://user:pass@ep-production.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
```

**Development**: Use local PostgreSQL
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/growthgrid_dev
```

### Email Configuration

**Production**: Use dedicated SendGrid account
**Staging**: Use SendGrid sandbox mode
**Development**: Use Ethereal (fake SMTP) or SendGrid test keys

### File Storage

**Production**: Use dedicated S3 bucket with CDN
**Staging**: Use staging S3 bucket
**Development**: Use local storage or test S3 bucket

## Security Considerations

### Secret Management

1. **Never commit secrets** to version control
2. **Use different secrets** for each environment
3. **Rotate secrets** regularly
4. **Use environment-specific keys** for external services

### Environment Variable Validation

```typescript
// lib/env.ts - Validate environment variables
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  SENDGRID_API_KEY: z.string().startsWith('SG.'),
  // ... other validations
})

export const env = envSchema.parse(process.env)
```

### Access Control

- **Production**: Restrict access to authorized personnel only
- **Staging**: Allow development team access
- **Development**: Local access only

## Testing Environment Configuration

### Health Checks

```bash
# Test database connection
npm run db:studio

# Test API endpoints
curl http://localhost:3000/api/health

# Test email sending
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### Environment Validation

```bash
# Check all required variables are set
node -e "
const required = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'SENDGRID_API_KEY'];
required.forEach(key => {
  if (!process.env[key]) console.log(\`Missing: \${key}\`);
  else console.log(\`✓ \${key}\`);
});
"
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Check `.env.local` file exists and is not in `.gitignore`
   - Restart development server
   - Verify variable names match exactly

2. **Database connection fails**
   - Verify DATABASE_URL format
   - Check database server is running
   - Ensure SSL mode is correct for your provider

3. **Authentication not working**
   - Verify NEXTAUTH_URL matches your domain
   - Check AUTH_SECRET is 32+ characters
   - Ensure NEXTAUTH_URL is set for production

4. **Email not sending**
   - Verify SendGrid API key is valid
   - Check sender email is verified in SendGrid
   - Test with SendGrid's SMTP settings

## Monitoring Environment Health

### Application Monitoring

```typescript
// lib/monitoring.ts
export function logEnvironmentInfo() {
  console.log('Environment:', {
    nodeEnv: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    databaseUrl: process.env.DATABASE_URL?.replace(/:\/\/.*@/, '://***:***@'),
    hasAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasSendGrid: !!process.env.SENDGRID_API_KEY,
    hasAws: !!process.env.AWS_ACCESS_KEY_ID,
  });
}
```

### Automated Health Checks

Set up monitoring for:
- Database connectivity
- External API availability (SendGrid, AWS)
- SSL certificate validity
- Domain DNS resolution
- Application response times
