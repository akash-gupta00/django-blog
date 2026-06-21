# Django Blog - DevOps Deployment Assignment

## Project Overview

This project is a Django Blog application deployed using Docker, Nginx, PostgreSQL, AWS EC2, Netlify, Kubernetes manifests, and CI/CD pipelines.

---

## Project Structure

```text
backend/                Django Backend
frontend/               Frontend Application
docker/                 Nginx Configuration
k8s/                    Kubernetes Manifests
.github/workflows/      CI/CD Pipelines
docker-compose.yml      Docker Compose Configuration
README.md               Documentation
```

---

## Tech Stack

* Django
* PostgreSQL
* Docker
* Docker Compose
* Nginx
* AWS EC2
* Netlify
* Kubernetes
* GitHub Actions

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

### Run Using Docker

```bash
docker compose up -d --build
```

### Verify Containers

```bash
docker ps
```

---

## Deployment Steps

### Backend Deployment (AWS EC2)

1. Launch EC2 Instance
2. Install Docker and Docker Compose
3. Clone Repository

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

4. Run Application

```bash
sudo docker compose up -d --build
```

5. Verify Running Containers

```bash
sudo docker ps
```

---

## Frontend Deployment

Frontend deployed on Netlify.

Frontend URL:

PASTE_YOUR_NETLIFY_URL_HERE

---

## Backend Deployment URL

Backend URL:

http://3.91.201.134

Health Check Endpoint:

http://3.91.201.134/health/

Posts Endpoint:

http://3.91.201.134/posts/

---

## Docker Services

* Django Application
* PostgreSQL Database
* Nginx Reverse Proxy

---

## Kubernetes

Kubernetes manifests are available inside:

```text
k8s/
```

---

## CI/CD

GitHub Actions workflow available inside:

```text
.github/workflows/
```

---

## Monitoring

Grafana Dashboard URL:

PASTE_GRAFANA_URL_HERE

Monitoring Stack:

* Grafana
* Prometheus
* Loki

---

## Author

Akash Gupta

GitHub Repository:

https://github.com/akash-gupta00/django-blog

```
```
