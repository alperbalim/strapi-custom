# Affiliate Content Platform

A modern, fast, and SEO-optimized affiliate platform featuring AI-generated roundups.

## Stack
- **Database**: PostgreSQL
- **Backend/CMS**: Strapi headless CMS
- **Frontend**: Next.js 14 App Router
- **AI**: OpenAI API integration
- **Infra**: Docker & Docker Compose

## Folder Structure
- `/apps/cms`: Strapi project
- `/apps/web`: Next.js project
- `/docker-compose.yml`: Local & production infrastructure orchestration

## Getting Started

1. Set up the environment file:
```bash
cp .env.example .env
# Edit .env and supply your OpenAI API key and production secrets
```

2. Start the entire stack with Docker:
```bash
docker-compose up -d --build
```

3. Access the platforms:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:1337/admin

## Deployment
This repository is read to be deployed using Dokploy with a reverse proxy:
- Map port `3000` to `app.yourdomain.com`
- Map port `1337` to `cms.yourdomain.com`
