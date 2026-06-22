# Django Blog - DevOps Deployment Assignment

## Project Overview

This is a Blog application built with Django REST Framework on the backend and a plain HTML/JS frontend. The whole thing is containerized with Docker and deployed on AWS EC2, with the frontend hosted separately on Netlify. Nginx sits in front of the Django app as a reverse proxy and also handles SSL termination via Let's Encrypt (Certbot).

The project also includes Kubernetes manifests for cluster-based deployment, a full CI/CD pipeline using GitHub Actions (with a self-hosted runner for CD), and a monitoring stack (Prometheus + Grafana + Loki) running inside the Kubernetes cluster.

---

## Project Structure

```text
backend/                  Django backend (REST API)
frontend/                 Frontend (HTML, CSS, JS)
docker/                   Nginx config
k8s/                      Kubernetes manifests
.github/workflows/        CI and CD pipelines
docker-compose.yml        Docker Compose configuration
README.md                 This file
```

---

## Tech Stack

* Django + Django REST Framework
* PostgreSQL
* Docker / Docker Compose
* Nginx (reverse proxy + SSL)
* AWS EC2 (Ubuntu, t3.micro)
* Netlify (frontend hosting)
* Kubernetes (Docker Desktop cluster)
* GitHub Actions (CI + CD)
* Self-hosted GitHub Runner (for CD)
* Prometheus + Grafana + Loki (monitoring)
* JWT Authentication (djangorestframework-simplejwt)

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/token/` | No | Get JWT access & refresh token |
| GET | `/posts/` | No | List all posts |
| POST | `/posts/` | Yes | Add a new post |
| GET | `/posts/<id>/comments/` | No | Get comments of a post |
| POST | `/posts/<id>/comments/` | Yes | Add a comment |
| GET | `/health/` | No | Returns `{"status": "ok"}` |
| GET | `/readiness/` | No | Returns `{"status": "ready"}` |

---

## Running Locally

Clone the repo:

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

Build and start everything with Docker Compose:

```bash
docker compose up -d --build
```

Check that all three containers are running:

```bash
docker ps
```

You should see `django_app`, `postgres_db`, and `nginx_proxy` all running.

Create a superuser (first time only):

```bash
docker exec -it django_app python manage.py createsuperuser
```

---

## Backend Deployment (AWS EC2)

1. Launched a t3.micro EC2 instance on AWS (Ubuntu, us-east-1).
2. Attached an Elastic IP so the public IP stays fixed across restarts.
3. Opened ports 22, 80, and 443 in the Security Group.
4. Installed Docker and Docker Compose on the instance.
5. Cloned the repository:

```bash
git clone https://github.com/akash-gupta00/django-blog.git
cd django-blog
```

6. Started the containers:

```bash
sudo docker compose up -d --build
```

7. Set up SSL using Certbot with a free `sslip.io` domain:

```bash
sudo apt install certbot -y
docker stop nginx_proxy
sudo certbot certonly --standalone -d 3-215-236-156.sslip.io
docker compose up -d
```

Nginx handles HTTPS termination and proxies requests to Django on port 8000 internally.

---

## Live URLs

**Frontend (Netlify):**
https://grand-cucurucho-55740e.netlify.app

**Backend (EC2 + Nginx + SSL):**
https://3-215-236-156.sslip.io

**Health Check:**
https://3-215-236-156.sslip.io/health/

**Posts Endpoint:**
https://3-215-236-156.sslip.io/posts/

**Admin Panel:**
https://3-215-236-156.sslip.io/admin/

---

## Docker Services

| Container | Image | Port | Description |
|-----------|-------|------|-------------|
| `django_app` | custom build | 8000 | Django app (Gunicorn) |
| `postgres_db` | postgres:17 | 5432 | PostgreSQL database |
| `nginx_proxy` | nginx:latest | 80, 443 | Reverse proxy + SSL |

Docker image is also pushed to DockerHub:
https://hub.docker.com/r/akashkrgupta01/django-blog

---

## Kubernetes Deployment

The app is deployed locally using Docker Desktop's built-in Kubernetes cluster.

Manifests are inside the `k8s/` folder:
- `deployment.yaml` - Django app deployment (2 replicas)
- `service.yaml` - ClusterIP service
- `ingress.yaml` - Nginx Ingress (host: django.local)

Apply manifests:

```bash
kubectl apply -f k8s/
```

Verify pods are running:

```bash
kubectl get pods
kubectl get svc
kubectl get ingress
```

---

## CI/CD Pipeline

Two GitHub Actions workflows are set up under `.github/workflows/`:

### CI (`ci.yml`) - runs on every push:
- Lints code with flake8
- Runs tests with pytest
- Builds Docker image
- Pushes image to DockerHub

### CD (`cd.yml`) - runs on push to main branch:
- Triggers deployment using `kubectl apply`
- Runs on a **self-hosted GitHub Actions runner** installed on the EC2 instance

Self-hosted runner is registered under:
`GitHub Repo → Settings → Actions → Runners`

---

## Monitoring

Prometheus, Grafana, and Loki are deployed inside the Kubernetes cluster for metrics and log monitoring.

**Install using Helm:**

```bash
# Prometheus + Grafana
helm install prometheus prometheus-community/kube-prometheus-stack

# Loki
helm install loki grafana/loki-stack
```

**Access Grafana locally:**

```bash
kubectl port-forward svc/grafana 3000:80
```

Then open: http://localhost:3000

Default login: `admin` / `admin`

Django application logs are visible in Grafana via the Loki data source.

---

## Notes

* Secrets (DB password, Django secret key) should ideally be moved to environment variables or Kubernetes secrets - currently hardcoded for simplicity
* `DEBUG = True` in settings - should be set to `False` in production
* `sslip.io` is used as a free domain alternative - a proper domain would be better for production

---

## Author

Akash Gupta

GitHub: https://github.com/akash-gupta00/django-blog