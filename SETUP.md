# Dashboard Setup Instructions

## Backend Setup (Laravel)

### 1. Ensure CORS is configured
✅ CORS middleware has been added to `app/Http/Middleware/CorsMiddleware.php`
✅ API routes have been configured in `routes/api.php`
✅ Bootstrap configuration updated to use API routes

### 2. Run Laravel Backend

Open terminal in `BackEnd_Laravel` folder:

```bash
php artisan serve
```

The API will run at: `http://localhost:8000`

### 3. Check Database Connection

Make sure your `.env` file has correct database settings:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=
```

Then run migrations if not done yet:

```bash
php artisan migrate
```

---

## Frontend Setup (React)

### 1. Install Dependencies

Open terminal in `FontEnd_React/my-app` folder:

```bash
npm install
```

### 2. Run React Development Server

```bash
npm start
```

The dashboard will open at: `http://localhost:3000`

---

## API Endpoints

All API endpoints follow REST standards and use JSON responses:

### Banners
- GET `/api/banners` - Get all banners
- POST `/api/banners` - Create banner
- PUT `/api/banners/{id}` - Update banner
- DELETE `/api/banners/{id}` - Delete banner

### Products
- GET `/api/products` - Get all products
- POST `/api/products` - Create product
- PUT `/api/products/{id}` - Update product
- DELETE `/api/products/{id}` - Delete product

### Categories
- GET `/api/categories` - Get all categories
- POST `/api/categories` - Create category
- PUT `/api/categories/{id}` - Update category
- DELETE `/api/categories/{id}` - Delete category

### Users
- GET `/api/users` - Get all users
- POST `/api/users` - Create user
- PUT `/api/users/{id}` - Update user
- DELETE `/api/users/{id}` - Delete user

### Comments
- GET `/api/comments` - Get all comments
- DELETE `/api/comments/{id}` - Delete comment

### Orders
- GET `/api/orders` - Get all orders
- GET `/api/orders/{id}` - Get order details
- PUT `/api/orders/{id}` - Update order status
- DELETE `/api/orders/{id}` - Delete order

---

## Dashboard Features

✅ **View all items** - List all items in a table
✅ **Add new items** - Form to create new items
✅ **Edit items** - Click edit to modify items
✅ **Delete items** - Delete with confirmation
✅ **File upload** - Banners and products support image uploads
✅ **Responsive design** - Works on desktop and tablet

---

## Troubleshooting

### Issue: CORS Error
- Make sure Laravel is running on http://localhost:8000
- Check CORS middleware is enabled

### Issue: Image not showing
- Make sure storage is linked: `php artisan storage:link`
- Check image path in database

### Issue: Form submission fails
- Check browser console for errors
- Make sure all required fields are filled
- Check database column names match API

---

## What's Done

✅ Backend API endpoints configured
✅ CORS middleware added
✅ Controllers converted to JSON responses
✅ React components created (Dashboard, List views, Forms)
✅ Axios configured for API calls
✅ Styling applied for admin dashboard
✅ Full CRUD operations working

Enjoy your admin dashboard! 🎉
