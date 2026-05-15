# Sparkle & Shine Backend — MongoDB + Docker

##  Quick Start

### 1. Start MongoDB with Docker
```bash
docker-compose up -d mongodb mongo-express
```

### 2. Install dependencies
```bash
npm install
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Start dev server
```bash
npm run dev
```

---

##  Docker Services

| Service       | URL                    | Credentials         |
|---------------|------------------------|---------------------|
| MongoDB       | localhost:27017        | from .env           |
| Mongo Express | http://localhost:8081  | admin / admin123    |
| Backend API   | http://localhost:5000  | —                   |
| Health Check  | http://localhost:5000/health | —             |

---

##  API Endpoints

### Auth
| Method | Endpoint              | Auth |
|--------|-----------------------|------|
| POST   | /api/auth/register    | No   |
| POST   | /api/auth/login       | No   |
| GET    | /api/auth/me          | Yes  |

### Bookings
| Method | Endpoint                     | Auth |
|--------|------------------------------|------|
| POST   | /api/bookings                | No   |
| GET    | /api/bookings                | Yes  |
| GET    | /api/bookings/:id            | Yes  |
| PATCH  | /api/bookings/:id/status     | Yes  |
| DELETE | /api/bookings/:id            | Yes  |

### Contact
| Method | Endpoint                | Auth |
|--------|-------------------------|------|
| POST   | /api/contact            | No   |
| GET    | /api/contact            | Yes  |
| PATCH  | /api/contact/:id/read   | Yes  |
| DELETE | /api/contact/:id        | Yes  |

### Services
| Method | Endpoint             | Auth |
|--------|----------------------|------|
| GET    | /api/services        | No   |
| GET    | /api/services/:slug  | No   |
| POST   | /api/services        | Yes  |
| PATCH  | /api/services/:id    | Yes  |
| DELETE | /api/services/:id    | Yes  |

### Testimonials
| Method | Endpoint                         | Auth |
|--------|----------------------------------|------|
| POST   | /api/testimonials                | No   |
| GET    | /api/testimonials                | No   |
| GET    | /api/testimonials/all            | Yes  |
| PATCH  | /api/testimonials/:id/approve    | Yes  |
| DELETE | /api/testimonials/:id            | Yes  |

### Payments
| Method | Endpoint                  | Auth |
|--------|---------------------------|------|
| POST   | /api/payments/intent      | No   |
| POST   | /api/payments/webhook     | No   |
| GET    | /api/payments             | Yes  |
| POST   | /api/payments/refund/:id  | Yes  |

### Admin
| Method | Endpoint          | Auth |
|--------|-------------------|------|
| GET    | /api/admin/stats  | Yes  |

---


