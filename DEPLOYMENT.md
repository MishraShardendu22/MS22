# Deployment Guide

This guide covers deploying the portfolio website to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [Self-Hosted](#self-hosted)
- [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

---

## Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "deploy: update portfolio"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`
   - Click "Deploy"

### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `mishrashardendu22.is-a.dev`)
3. Configure DNS records as shown
4. Wait for SSL certificate provisioning

---

## Netlify

### Using Netlify CLI

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Using Git Integration

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `pnpm build`
   - Publish directory: `.next`
   - Node version: `20.0.0`

3. **Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add all variables from `.env.example`

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20.0.0"
  PNPM_VERSION = "10.0.0"
```

---

## Self-Hosted

### Using PM2

```bash
# Build the application
pnpm build

# Install PM2 globally
pnpm add -g pm2

# Start with PM2
pm2 start pnpm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup
```

### Using Nginx

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name mishrashardendu22.is-a.dev;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Start the application**
   ```bash
   pnpm start
   ```

### Using systemd

Create `/etc/systemd/system/portfolio.service`:

```ini
[Unit]
Description=Portfolio Website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/portfolio
ExecStart=/usr/bin/pnpm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable portfolio
sudo systemctl start portfolio
```

---

## Docker

### Docker Deployment

1. **Create Dockerfile**

```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@10

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

2. **Build Docker Image**
   ```bash
   docker build -t portfolio:latest .
   ```

3. **Run Container**
   ```bash
   docker run -p 3000:3000 --env-file .env portfolio:latest
   ```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_GITHUB_USERNAME=your_username
NEXT_PUBLIC_LEETCODE_USERNAME=your_username
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Platform-Specific Setup

**Vercel**: Use the Environment Variables section in project settings

**Netlify**: Add in Site Settings → Build & Deploy → Environment

**Self-Hosted**: Create `.env` file in the project root

**Docker**: Use `--env-file` flag or environment section in docker-compose

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test API endpoints
- [ ] Check GitHub stats integration
- [ ] Test LeetCode stats integration
- [ ] Verify contact form functionality
- [ ] Test responsive design on mobile devices
- [ ] Check SSL certificate
- [ ] Verify custom domain configuration
- [ ] Test PWA installation
- [ ] Check analytics integration
- [ ] Verify sitemap accessibility (`/sitemap.xml`)
- [ ] Test robots.txt (`/robots.txt`)
- [ ] Check Open Graph meta tags
- [ ] Test page speed with Lighthouse
- [ ] Verify error pages (404, 500)

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

**Issue**: TypeScript errors
```bash
# Run type check
pnpm type-check

# Fix auto-fixable issues
pnpm lint:fix
```

### Runtime Errors

**Issue**: API calls fail
- Check environment variables are set correctly
- Verify backend URL is accessible
- Check CORS configuration

**Issue**: Images not loading
- Verify image paths are correct
- Check Next.js image domains configuration in `next.config.ts`

### Performance Issues

**Issue**: Slow page loads
- Enable compression in your web server
- Verify CDN is configured correctly
- Check bundle size with `pnpm build`
- Enable caching headers

### SSL/HTTPS Issues

**Issue**: Mixed content warnings
- Ensure all external resources use HTTPS
- Check `NEXT_PUBLIC_BASE_URL` uses HTTPS

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      
      - run: pnpm build
        env:
          NEXT_PUBLIC_BASE_URL: ${{ secrets.BASE_URL }}
          NEXT_PUBLIC_BACKEND_URL: ${{ secrets.BACKEND_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Support

For deployment issues:
- Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- Visit [GitHub Issues](https://github.com/MishraShardendu22/MS22/issues)
- Email: mishrashardendu221@gmail.com
