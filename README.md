# Proyecto Integrador – NodeJS Backend

API REST construida con Node.js, Express y MongoDB.

## Cómo iniciar

```bash
npm install
npm run dev   # desarrollo (nodemon)
npm start     # producción
```

El servidor escucha en el puerto `4000` por defecto (o el valor de la variable de entorno `PORT`).

---

## Endpoints de la API

### Autenticación – `/auth`

| Método | Ruta | Descripción | Requiere autenticación |
|--------|------|-------------|------------------------|
| POST | `/auth/register` | Registrar un nuevo usuario | No |
| POST | `/auth/login` | Iniciar sesión y obtener un JWT | No |
| POST | `/auth/refresh` | Renovar un token JWT | No |
| GET  | `/auth/confirm` | Confirmar dirección de email | No |

---

### Órdenes – `/orders`

| Método | Ruta | Descripción | Requiere autenticación |
|--------|------|-------------|------------------------|
| POST | `/orders/create` | **Crear una nueva orden** | Sí |
| GET  | `/orders/mypurchases` | Obtener las órdenes del usuario autenticado | Sí |

---

#### POST `/orders/create` – Crear una nueva orden

Todas las rutas protegidas requieren un JWT válido enviado en el encabezado `Authorization`:

```
Authorization: Bearer <token>
```

**Cuerpo de la solicitud (JSON)**

```json
{
  "items": [
    {
      "id": 1,
      "title": "Nombre del producto",
      "description": "Descripción del producto",
      "image": "https://ejemplo.com/imagen.jpg",
      "quantity": 2,
      "price": 150.00
    }
  ],
  "shippingDetails": {
    "name": "Juan Pérez",
    "cellphone": "+541234567890",
    "location": "Buenos Aires",
    "address": "Av. Corrientes 1234"
  },
  "shippingCost": 500
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `items` | array | Sí | Array no vacío de productos de la orden |
| `items[].id` | number | Sí | ID del producto |
| `items[].title` | string | Sí | Nombre del producto |
| `items[].description` | string | Sí | Descripción del producto |
| `items[].image` | string | Sí | URL de la imagen del producto |
| `items[].quantity` | number | Sí | Cantidad (debe ser > 0) |
| `items[].price` | number | Sí | Precio unitario (debe ser ≥ 0) |
| `shippingDetails` | object | Sí | Datos de envío |
| `shippingDetails.name` | string | Sí | Nombre del destinatario |
| `shippingDetails.cellphone` | string | Sí | Teléfono del destinatario |
| `shippingDetails.location` | string | Sí | Ciudad / región |
| `shippingDetails.address` | string | Sí | Dirección de entrega |
| `shippingCost` | number | Sí | Costo de envío (debe ser ≥ 0) |

**Respuesta exitosa – `201 Created`**

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

> `subtotal` y `total` son calculados automáticamente por el servidor:
> - `subtotal = suma(item.price * item.quantity)`
> - `total = subtotal + shippingCost`

**Respuestas de error**

| Estado | Significado |
|--------|-------------|
| 400 | Error de validación – revisar el cuerpo de la respuesta para más detalles |
| 401 | No autorizado – JWT ausente o inválido |
| 500 | Error interno del servidor |
