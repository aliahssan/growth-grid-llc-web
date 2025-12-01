# Deployment Guide

## Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate ready
- [ ] Domain DNS configured
- [ ] Monitoring tools set up
- [ ] Backup strategy in place

## Environment Setup

### Required Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

# Authentication
AUTH_SECRET=your-32-character-secret
NEXTAUTH_URL=https://yourdomain.com
AUTH_TRUST_HOST=true

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_TO_EMAIL=hello@yourdomain.com

# File Uploads (AWS S3)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
UPLOADS_BUCKET_NAME=your-bucket-name

# Application
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Monitoring (optional)
SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

### Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed

# Optional: Open Prisma Studio
npm run db:studio
```

## Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Vercel Configuration:**
- `vercel.json` handles build settings and headers
- Environment variables set in Vercel dashboard
- Automatic HTTPS and CDN included

### 2. Docker

```bash
# Build image
npm run docker:build

# Run locally
npm run docker:run

# Or with docker-compose
docker-compose up -d
```

### 3. Manual Server

```bash
# Build application
npm run build

# Start production server
npm start
```

## Post-deployment

### Health Checks

```bash
# Check application health
curl https://yourdomain.com/api/health

# Check database connection
curl https://yourdomain.com/api/health
```

### Monitoring Setup

1. **Error Tracking**: Set up Sentry or similar
2. **Analytics**: Configure Google Analytics or Vercel Analytics
3. **Uptime Monitoring**: Use services like UptimeRobot
4. **Performance**: Monitor Core Web Vitals

### Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] Input validation working
- [ ] Authentication required for admin routes
- [ ] Database credentials secure
- [ ] API keys protected

### Performance Optimization

- [ ] Images optimized
- [ ] Bundle splitting configured
- [ ] Caching headers set
- [ ] CDN enabled
- [ ] Compression enabled

## Rollback Plan

```bash
# Vercel rollback
vercel rollback

# Docker rollback
docker tag your-app:previous your-app:latest
docker-compose up -d

# Database rollback (if needed)
npm run db:migrate -- --to-migration-name
```

## Maintenance

### Regular Tasks

- Monitor error logs
- Update dependencies monthly
- Review security headers
- Check performance metrics
- Backup database weekly

### Updates

```bash
# Update dependencies
npm update

# Test build
npm run build

# Deploy updates
vercel --prod
```
