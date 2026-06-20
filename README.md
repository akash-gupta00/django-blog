# Django Kubernetes Deployment Project

## Local Run Steps

### Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment Steps

### Docker Build

```bash
docker build -t django-app .
docker-compose up -d
```

### Kubernetes Deployment

```bash
kubectl apply -f k8s/
kubectl get pods
kubectl get services
```

## Netlify Link

Frontend URL:
https://your-netlify-url.netlify.app

## Backend URL

Backend URL:
http://YOUR-AWS-IP

or

https://your-domain.com

## Grafana Dashboard URL

Grafana URL:
http://YOUR-IP:3000

### Monitoring Stack

* Prometheus configured for metrics collection
* Grafana configured for dashboards
* Loki configured for log aggregation
* Kubernetes monitoring dashboard created
* Application logs available through Loki

## Repository Structure

```text
backend/
frontend/
docker/
k8s/
.github/workflows/
README.md
```
