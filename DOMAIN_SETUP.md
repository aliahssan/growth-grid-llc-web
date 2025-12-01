# Domain Configuration Guide

## DNS Records for Vercel Deployment

### Step 1: Add Domain to Vercel

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Domains" tab
4. Add your custom domain (e.g., `growthgrid.dev`)

### Step 2: Configure DNS Records

Update your DNS provider with the following records:

#### A Records (for root domain)
```
Type: A
Name: @
Value: 76.223.126.88
TTL: 300

Type: A
Name: @
Value: 13.248.155.104
TTL: 300
```

#### CNAME Record (for www subdomain)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

#### TXT Record (for domain verification)
```
Type: TXT
Name: _vercel
Value: vc-domain-verify=growthgrid.dev,abc123def456
TTL: 300
```

### Step 3: SSL Certificate

Vercel automatically provisions SSL certificates for your domain. This may take a few minutes to propagate.

### Step 4: Custom Domain Verification

1. Wait for DNS propagation (can take up to 24 hours)
2. Check domain status in Vercel dashboard
3. Once verified, your site will be available at your custom domain

## Alternative: Cloudflare Configuration

If using Cloudflare as DNS provider:

### DNS Records
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Auto

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

### SSL/TLS Settings
1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

### Page Rules (Optional)
```
URL: https://growthgrid.dev/*
Setting: Always Online (On)
```

## Domain Redirects

### Redirect www to root domain

If you want to redirect `www.growthgrid.dev` to `growthgrid.dev`:

1. In Vercel dashboard, add both domains
2. Set `growthgrid.dev` as the primary domain
3. Vercel will automatically redirect `www` to root

### Alternative: DNS Redirect

Some DNS providers support URL redirects. Configure:
```
Type: URL Redirect
Name: www
Value: https://growthgrid.dev
Type: 301 (Permanent)
```

## Testing Domain Configuration

### DNS Propagation Check
```bash
# Check DNS records
dig growthgrid.dev
dig www.growthgrid.dev

# Check SSL certificate
openssl s_client -connect growthgrid.dev:443 -servername growthgrid.dev
```

### Application Testing
```bash
# Test homepage
curl -I https://growthgrid.dev

# Test health endpoint
curl https://growthgrid.dev/api/health

# Test redirects
curl -I https://www.growthgrid.dev
```

## Troubleshooting

### Common Issues

1. **DNS not propagating**
   - Wait 24-48 hours for DNS changes
   - Clear local DNS cache: `ipconfig /flushdns` (Windows)

2. **SSL certificate issues**
   - Vercel handles SSL automatically
   - Check domain status in Vercel dashboard

3. **Mixed content warnings**
   - Ensure all assets load over HTTPS
   - Check for hardcoded HTTP URLs

4. **CORS issues**
   - Verify domain is added to Vercel project
   - Check environment variables for correct domains

### Debug Commands
```bash
# Check current DNS
nslookup growthgrid.dev

# Test SSL
curl -v https://growthgrid.dev

# Check headers
curl -I https://growthgrid.dev

# Test API endpoints
curl https://growthgrid.dev/api/health
```

## Monitoring

After setup, monitor your domain using:

- **Google Search Console**: Add property for SEO monitoring
- **Vercel Analytics**: Monitor performance and errors
- **UptimeRobot**: Set up uptime monitoring
- **Sentry**: Error tracking and performance monitoring

## Security Considerations

- Enable HSTS headers (handled by Vercel)
- Set up proper CSP headers (configured in next.config.ts)
- Monitor for SSL certificate expiration
- Regular security audits of DNS configuration
