# Django Blog - DevOps Deployment Assignment

## Project Overview

This is a simple Blog application built with Django REST Framework on the backend and a plain HTML/JS frontend. The whole thing is containerized with Docker and deployed on AWS EC2, with the frontend hosted separately on Netlify. Nginx sits in front of the Django app as a reverse proxy and also handles SSL.

I also added Kubernetes manifests and a basic CI/CD workflow as part of the assignment, though the main deployment runs through Docker Compose on EC2.

---

## Project Structure

```text
backend/                Django backend (REST API)
frontend/                Frontend (HTML, CSS, JS)
docker/                  Nginx config files
k8s/                      Kubernetes manifests
.github/workflows/    CI/CD pipeline
docker-compose.yml   Docker Compose setup
README.md             This file
```

---

## Tech Stack

* Django + Django REST Framework
* PostgreSQL
* Docker / Docker Compose
* Nginx (reverse proxy + SSL)
* AWS EC2
* Netlify (frontend hosting)
* Kubernetes (manifests)
* GitHub Actions

---

## Running Locally

Clone the repo:

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

Build and start everything with Docker:

```bash
docker compose up -d --build
```

Check that all containers are up:

```bash
docker ps
```

You should see three containers running - the Django app, Postgres, and Nginx.

---

## Backend Deployment (AWS EC2)

1. Launched a t3.micro EC2 instance on AWS (Ubuntu).
2. Installed Docker and Docker Compose on the instance.
3. Cloned the repo onto the server:

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

4. Started the containers:

```bash
sudo docker compose up -d --build
```

5. Verified everything was running:

```bash
sudo docker ps
```

An Elastic IP was attached to the instance so the IP stays fixed even if the server restarts. For SSL, I used a free `sslip.io` domain (since I didn't want to buy a domain just for this assignment) and generated a certificate with Certbot. Nginx handles HTTPS termination and forwards requests to the Django app over port 8000 internally.

---

## Live URLs

**Frontend (Netlify):**
https://grand-cucurucho-55740e.netlify.app

**Backend (EC2 + Nginx + SSL):**
https://3-215-236-156.sslip.io

**Health check:**
https://3-215-236-156.sslip.io/health/

**Posts endpoint:**
https://3-215-236-156.sslip.io/posts/

**Admin panel:**
https://3-215-236-156.sslip.io/admin/

---

## Docker Services

* `django_app` - Django application server (Gunicorn)
* `postgres_db` - PostgreSQL database
* `nginx_proxy` - Nginx reverse proxy with SSL

---

## Kubernetes

Kubernetes manifests (Deployment, Service, Ingress) are included in the `k8s/` folder for reference, in case the app needs to move to a cluster setup later.

---

## CI/CD

A basic GitHub Actions workflow is set up under `.github/workflows/` to automate build/test on push.

---

## Notes / Things I'd improve later

* Move secrets (DB password, Django secret key) into environment variables instead of hardcoding them in settings.py
* Set `DEBUG = False` for production
* Get a proper domain instead of relying on sslip.io
* Add monitoring (Grafana/Prometheus) - not set up yet for this version

---

## Author

Akash Gupta

GitHub Repository: https://github.com/akash-gupta00/django-blog