# Growth Grid — Full-Stack Web Application

This repository contains a complete, production-ready full-stack web application built with modern technologies. The project demonstrates enterprise-grade development practices from initial setup through deployment and monitoring.

## 🏗️ Architecture Overview

### Tech Stack

**Frontend:**
- **Framework:** Next.js 16 (App Router + React Server Components)
- **Styling:** Tailwind CSS v3 with custom design system
- **UI Components:** ShadCN/UI with Radix primitives
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React

**Backend:**
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5 with database sessions
- **API:** RESTful endpoints with Server Actions
- **Email:** SendGrid integration
- **File Storage:** AWS S3 with presigned URLs

**Infrastructure:**
- **Hosting:** Vercel (recommended) or Docker
- **Database:** Neon (recommended) or PlanetScale
- **CI/CD:** GitHub Actions
- **Monitoring:** Web Vitals + error tracking

**Quality Assurance:**
- **Linting:** ESLint with Next.js rules
- **Type Safety:** TypeScript strict mode
- **Testing:** Jest + React Testing Library
- **Security:** Input sanitization + rate limiting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (local or cloud)
- GitHub account (for CI/CD)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/yourusername/growth-grid.git
cd growth-grid

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Set up database
npm run db:push
npm run db:seed

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Environment Variables

```bash
# Application
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/growthgrid

# Authentication
NEXTAUTH_SECRET=your-32-character-secret
NEXTAUTH_URL=http://localhost:3000

# Email (SendGrid)
SENDGRID_API_KEY=SG.your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_TO_EMAIL=hello@yourdomain.com

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
UPLOADS_BUCKET_NAME=your-bucket-name
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (/login)
│   ├── (dashboard)/              # Protected admin routes (/dashboard/*)
│   ├── (marketing)/              # Public marketing pages
│   ├── api/                      # API routes
│   ├── global-error.tsx          # Global error boundary
│   ├── layout.tsx                # Root layout with providers
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # XML sitemap generation
├── components/                   # Reusable UI components
│   ├── analytics/                # Analytics & tracking
│   ├── dashboard/                # Admin dashboard components
│   ├── layout/                   # Layout components
│   ├── seo/                      # SEO & metadata components
│   └── ui/                       # Base UI components
├── config/                       # Configuration files
├── lib/                          # Utility libraries
│   ├── analytics.ts              # Analytics tracking
│   ├── auth.ts                   # NextAuth configuration
│   ├── email.ts                  # SendGrid integration
│   ├── prisma.ts                 # Prisma client
│   ├── rate-limit.ts             # Rate limiting
│   ├── security.ts               # Security utilities
│   ├── seo.ts                    # SEO helpers
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema & migrations
├── public/                       # Static assets
├── styles/                       # Global styles & design tokens
├── .github/workflows/            # CI/CD pipelines
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Local development stack
├── vercel.json                   # Vercel deployment config
└── DEPLOYMENT.md                 # Detailed deployment guide
```

## 🎯 Features

### Marketing Site
- **Homepage:** Hero section with CTAs and social proof
- **About Page:** Company story and team information
- **Contact Page:** Lead capture form with email integration
- **Legal Pages:** Privacy policy and terms of service
- **SEO Optimized:** Meta tags, structured data, sitemaps

### Admin Dashboard
- **Authentication:** Secure login with session management
- **User Management:** Invite team members and manage roles
- **Content Management:** Create and publish posts
- **Analytics:** Usage metrics and performance insights
- **Role-based Access:** Admin-only protected routes

### API Endpoints
- **Health Check:** `/api/health` - Application status
- **Authentication:** `/api/auth/*` - NextAuth handlers
- **Posts CRUD:** `/api/posts` - Content management
- **Users:** `/api/users` - User management
- **Contact:** `/api/contact` - Form submissions
- **Uploads:** `/api/uploads/presign` - File upload URLs

### Security Features
- **Rate Limiting:** API protection against abuse
- **Input Validation:** Zod schemas for all user inputs
- **Authentication:** Session-based security
- **Authorization:** Role-based access control
- **HTTPS:** SSL/TLS encryption
- **Security Headers:** CSP, HSTS, X-Frame-Options

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Production server
npm run preview          # Build and preview locally

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Create migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Quality
npm run lint             # ESLint
npm run lint:fix         # Fix linting issues
npm run type-check       # TypeScript validation

# Testing
npm run test:unit        # Unit tests
npm run test:e2e         # E2E tests
npm run test:coverage    # Test coverage

# Deployment
npm run vercel:build     # Build for Vercel
npm run docker:build     # Build Docker image
npm run docker:run       # Run with Docker
npm run health           # Health check
```

### Development Guidelines

1. **Code Style:** Follow ESLint configuration
2. **Type Safety:** Use TypeScript for all new code
3. **Testing:** Write tests for new features
4. **Documentation:** Update README for API changes
5. **Security:** Validate all user inputs
6. **Performance:** Optimize images and bundle size

## 🚀 Deployment

### Quick Deploy (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Production deployment
vercel --prod
```

### Docker Deployment

```bash
# Build and run
npm run docker:build
npm run docker:run

# Or with docker-compose
docker-compose up -d
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📊 Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals:** Automatic tracking and reporting
- **Bundle Analysis:** Webpack bundle size monitoring
- **Lighthouse Scores:** SEO, performance, and accessibility

### Error Tracking

- **Global Error Boundaries:** Client and server error handling
- **Sentry Integration:** Production error tracking
- **Logging:** Structured logging with request correlation

### Business Analytics

- **User Events:** Custom event tracking
- **Conversion Funnels:** Goal and conversion monitoring
- **A/B Testing:** Feature flag infrastructure

## 🔒 Security

### Application Security

- **Input Sanitization:** XSS and injection prevention
- **Rate Limiting:** API abuse protection
- **CSRF Protection:** Cross-site request forgery prevention
- **Secure Headers:** Comprehensive security headers
- **Dependency Scanning:** Automated vulnerability detection

### Infrastructure Security

- **HTTPS Only:** SSL/TLS encryption required
- **Environment Isolation:** Separate secrets per environment
- **Access Control:** Principle of least privilege
- **Regular Updates:** Dependency and security updates

## 🧪 Testing

### Automated Testing

```bash
# Run all tests
npm run test:unit
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Admin dashboard access
- [ ] Content creation and publishing
- [ ] File upload functionality
- [ ] Email sending verification
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

See [TESTING.md](./TESTING.md) for comprehensive testing documentation.

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[DOMAIN_SETUP.md](./DOMAIN_SETUP.md)** - Custom domain configuration
- **[ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)** - Environment management
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Database configuration
- **[TESTING.md](./TESTING.md)** - Testing and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with tests
4. Run the test suite: `npm run test:unit`
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

### Code Standards

- **Commits:** Use conventional commit format
- **PRs:** Include description and link to issues
- **Tests:** Maintain >80% code coverage
- **Documentation:** Update docs for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Prisma** - For the excellent ORM
- **Tailwind CSS** - For utility-first styling
- **shadcn/ui** - For beautiful component primitives

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/growth-grid/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/growth-grid/discussions)
- **Email:** hello@growthgrid.dev

---

**Built with ❤️ using Next.js, Prisma, and modern web technologies.**

*This project demonstrates production-ready full-stack development practices and serves as a comprehensive template for modern web applications.*