# Database Production Setup Guide

## Database Provider Options

### 1. Neon (Recommended)

**Pros**: Serverless, automatic scaling, branching for staging
**Pricing**: Generous free tier, pay-per-compute

#### Setup Steps

1. **Create Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up with GitHub/Google

2. **Create Project**
   - Choose "Growth Grid" as project name
   - Select PostgreSQL 15
   - Choose region closest to users (us-east-1 recommended)

3. **Create Database**
   - Default database name: `neondb`
   - Note the connection string format

4. **Connection String**
   ```
   postgresql://username:password@ep-cool-mode-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

5. **Environment Variables**
   ```bash
   DATABASE_URL=postgresql://user:pass@ep-production.us-east-1.aws.neon.tech/neondb?sslmode=require
   NEON_API_KEY=your-neon-api-key  # Optional, for API access
   ```

### 2. PlanetScale

**Pros**: MySQL-compatible, branching, global read replicas
**Pricing**: Free tier available

#### Setup Steps

1. Create PlanetScale account
2. Create database with MySQL compatibility
3. Generate connection string
4. Update Prisma schema to use MySQL provider

### 3. AWS RDS

**Pros**: Full control, enterprise features
**Pricing**: Pay for provisioned capacity

#### Setup Steps

1. Create RDS PostgreSQL instance
2. Configure security groups
3. Enable SSL connections
4. Set up automated backups

## Database Migration Strategy

### Development to Production

1. **Schema Migration**
   ```bash
   # Generate migration files
   npx prisma migrate dev --name initial_schema

   # Apply to production
   npx prisma db push
   ```

2. **Data Seeding**
   ```bash
   # Seed production database
   SEED_ADMIN_EMAIL=admin@yourdomain.com npm run db:seed
   ```

### Zero-Downtime Migrations

```bash
# Create migration
npx prisma migrate dev --name add_new_field

# Deploy with zero downtime
npx prisma db push

# Update application code
git push origin main
```

## Database Optimization

### Connection Pooling

**Neon**: Automatic connection pooling included

**Manual Setup**:
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Indexes and Performance

```sql
-- Add indexes for common queries
CREATE INDEX CONCURRENTLY idx_posts_author_id ON posts(author_id);
CREATE INDEX CONCURRENTLY idx_posts_status ON posts(status);
CREATE INDEX CONCURRENTLY idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

### Monitoring Queries

```typescript
// lib/prisma.ts - Add query logging in development
export const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
})

// Listen for query events
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
```

## Backup Strategy

### Automatic Backups (Neon)

- **Point-in-time recovery**: 7 days retention
- **Automatic**: No configuration needed
- **Branching**: Create backup branches instantly

### Manual Backup Script

```bash
# backup.sh
#!/bin/bash
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"

# Upload to S3 (optional)
aws s3 cp "${BACKUP_FILE}.gz" "s3://your-backup-bucket/"

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_FILE}.gz"
```

### Restore from Backup

```bash
# Restore database
gunzip backup_file.sql.gz
psql "$DATABASE_URL" < backup_file.sql
```

## Database Security

### Connection Security

1. **SSL Required**: Always use `sslmode=require`
2. **IP Whitelisting**: Restrict database access to application servers
3. **Strong Passwords**: Use generated passwords, not default ones
4. **Connection Limits**: Set reasonable connection limits

### Data Protection

1. **Encryption at Rest**: Enable in database provider
2. **Encryption in Transit**: SSL/TLS for all connections
3. **PII Handling**: Encrypt sensitive data fields
4. **Access Logging**: Enable query logging for security monitoring

### Row Level Security (Optional)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY user_own_data ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY admin_all_data ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );
```

## Monitoring and Maintenance

### Health Checks

```typescript
// api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    // Test user count (optional)
    const userCount = await prisma.user.count()

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      users: userCount,
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'unhealthy', error: 'Database connection failed' },
      { status: 500 }
    )
  }
}
```

### Performance Monitoring

```sql
-- Query performance
SELECT
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Maintenance Tasks

**Weekly:**
- Review slow queries
- Check disk usage
- Monitor connection counts

**Monthly:**
- Update database statistics: `ANALYZE;`
- Review and optimize indexes
- Clean up old data

**Quarterly:**
- Security updates
- Performance tuning
- Backup testing

## Troubleshooting

### Common Issues

1. **Connection timeouts**
   - Check connection string format
   - Verify SSL requirements
   - Test from application server

2. **Migration failures**
   - Check database permissions
   - Review migration files
   - Test on staging first

3. **Performance degradation**
   - Check query execution plans
   - Review index usage
   - Monitor connection pooling

4. **Data inconsistencies**
   - Compare staging vs production schemas
   - Check application logs
   - Verify migration rollbacks

### Emergency Procedures

1. **Immediate Actions**
   - Check application logs
   - Monitor database metrics
   - Alert development team

2. **Containment**
   - Scale database resources if needed
   - Implement query rate limiting
   - Redirect traffic if necessary

3. **Recovery**
   - Restore from backup if data corruption
   - Roll back application changes
   - Update incident response documentation

## Migration Checklist

- [ ] Database provider selected and configured
- [ ] Connection strings updated in all environments
- [ ] SSL/TLS enabled for all connections
- [ ] Backup strategy implemented and tested
- [ ] Monitoring and alerting configured
- [ ] Access controls and permissions set
- [ ] Performance baselines established
- [ ] Documentation updated with new procedures
