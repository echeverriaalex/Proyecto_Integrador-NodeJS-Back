# Proyecto Integrador – NodeJS Backend

REST API built with Node.js, Express and MongoDB.

## Getting Started

```bash
npm install
npm run dev   # development (nodemon)
npm start     # production
```

The server listens on port `4000` by default (or the value of the `PORT` environment variable).

---

## API Endpoints

### Auth – `/auth`

| Method | Path | Description | Auth required |
|--------|------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Log in and receive a JWT | No |
| POST | `/auth/refresh` | Refresh a JWT token | No |
| GET  | `/auth/confirm` | Confirm email address | No |

---

### Orders – `/orders`

| Method | Path | Description | Auth required |
|--------|------|-------------|---------------|
| POST | `/orders/create` | **Create a new order** | Yes |
| GET  | `/orders/mypurchases` | Get orders for the authenticated user | Yes |

---

#### POST `/orders/create` – Create a new order

All protected routes require a valid JWT sent in the `Authorization` header:

```
Authorization: Bearer <token>
```

**Request body (JSON)**

```json
{
  "items": [
    {
      "id": 1,
      "title": "Product name",
      "description": "Product description",
      "image": "https://example.com/image.jpg",
      "quantity": 2,
      "price": 150.00
    }
  ],
  "shippingDetails": {
    "name": "John Doe",
    "cellphone": "+1234567890",
    "location": "Buenos Aires",
    "address": "Av. Corrientes 1234"
  },
  "shippingCost": 500
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Non-empty array of order items |
| `items[].id` | number | Yes | Product ID |
| `items[].title` | string | Yes | Product title |
| `items[].description` | string | Yes | Product description |
| `items[].image` | string | Yes | Product image URL |
| `items[].quantity` | number | Yes | Quantity (must be > 0) |
| `items[].price` | number | Yes | Unit price (must be ≥ 0) |
| `shippingDetails` | object | Yes | Shipping information |
| `shippingDetails.name` | string | Yes | Recipient name |
| `shippingDetails.cellphone` | string | Yes | Recipient phone number |
| `shippingDetails.location` | string | Yes | City / region |
| `shippingDetails.address` | string | Yes | Street address |
| `shippingCost` | number | Yes | Shipping cost (must be ≥ 0) |

**Successful response – `201 Created`**

```json
{
  "order": {
    "_id": "...",
    "user": "...",
    "items": [...],
    "shippingDetails": {...},
    "shippingCost": 500,
    "subtotal": 300,
    "total": 800,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

> `subtotal` and `total` are calculated automatically by the server:
> - `subtotal = sum(item.price * item.quantity)`
> - `total = subtotal + shippingCost`

**Error responses**

| Status | Meaning |
|--------|---------|
| 400 | Validation error – check the response body for details |
| 401 | Unauthorized – missing or invalid JWT |
| 500 | Internal server error |
