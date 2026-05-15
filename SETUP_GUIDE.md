# Project Setup Guide - Laravel + React Integration

## Overview

This project consists of:
- **Backend**: Laravel API (port 8000)
- **Frontend**: React Application (port 3000)

Both are connected via REST API with CORS enabled.

## Prerequisites

- PHP 8.0+ with Laravel 11
- Node.js 14+ and npm
- MySQL/MariaDB
- XAMPP (for Windows) or any other local development environment

## Backend Setup (Laravel)

### 1. Navigate to the backend directory

```bash
cd BackEnd_Laravel
```

### 2. Install dependencies

```bash
composer install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` file and configure:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Generate application key

```bash
php artisan key:generate
```

### 5. Create database

```bash
php artisan migrate
```

Or with seeding (if seeders exist):
```bash
php artisan migrate:seed
```

### 6. Start the development server

```bash
php artisan serve
```

The API will be available at: **http://localhost:8000/api**

## Frontend Setup (React)

### 1. Navigate to the React directory

```bash
cd react_lam/my-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Make sure `.env` file exists with:
```
REACT_APP_API_URL=http://localhost:8000/api
```

If running on a different domain:
```
REACT_APP_API_URL=http://your-domain.com/api
```

### 4. Start the development server

```bash
npm start
```

The app will be available at: **http://localhost:3000**

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Available Endpoints

#### Authentication
- `POST /login` - User login
- `POST /register` - User registration

#### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get single product
- `POST /products` - Create product (requires auth)
- `PUT /products/{id}` - Update product (requires auth)
- `DELETE /products/{id}` - Delete product (requires auth)
- `GET /featured-products` - Get featured products

#### Categories
- `GET /categories` - List all categories
- `GET /categories/{id}` - Get single category
- `POST /categories` - Create category (requires auth)
- `PUT /categories/{id}` - Update category (requires auth)
- `DELETE /categories/{id}` - Delete category (requires auth)

#### Orders
- `GET /orders` - List all orders (requires auth)
- `GET /orders/{id}` - Get single order (requires auth)
- `PUT /orders/{id}` - Update order status (requires auth)
- `DELETE /orders/{id}` - Delete order (requires auth)

#### Banners
- `GET /banners` - List all banners
- `GET /banners/{id}` - Get single banner
- `GET /banners/active` - Get active banners
- `POST /banners` - Create banner (requires auth)
- `PUT /banners/{id}` - Update banner (requires auth)
- `DELETE /banners/{id}` - Delete banner (requires auth)

#### Comments
- `GET /comments` - List all comments
- `DELETE /comments/{id}` - Delete comment (requires auth)

## Using the API Services in React

All API services are located in `src/services/`:

### Import and use services

```javascript
import productService from './services/productService';
import authService from './services/authService';
import categoryService from './services/categoryService';
import orderService from './services/orderService';
import bannerService from './services/bannerService';
import commentService from './services/commentService';
```

### Example: Fetch products

```javascript
import { useEffect, useState } from 'react';
import productService from './services/productService';

function MyComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default MyComponent;
```

## Troubleshooting

### CORS Errors
- Ensure Laravel is running on port 8000
- Check that `REACT_APP_API_URL` in `.env` is correct
- CORS is configured in `app/Http/Middleware/CorsMiddleware.php`

### 404 Not Found
- Verify Laravel routes in `routes/api.php`
- Check that database tables and records exist
- Ensure you're using the correct HTTP method

### 401 Unauthorized
- Login before accessing protected endpoints
- Check that auth token is stored in localStorage
- Verify token is being sent in request headers

### Connection Refused
- Check that Laravel server is running (`php artisan serve`)
- Check that React development server is running (`npm start`)
- Verify ports are not in use by other applications

## Development Tips

1. **Hot Reload**: React automatically reloads changes during development
2. **API Testing**: Use Postman to test API endpoints independently
3. **Browser DevTools**: Check Network tab to verify API calls
4. **localStorage**: Auth token and user data are stored in browser localStorage
5. **Console Logs**: Check browser console for error messages

## Production Deployment

### For Laravel:
1. Build for production
2. Deploy to hosting with PHP support
3. Configure proper environment variables
4. Run migrations on production database

### For React:
1. Build: `npm run build`
2. Deploy the `build/` folder to static hosting
3. Update `REACT_APP_API_URL` to production API URL
4. Configure CORS for production domain

## File Structure Summary

```
project/
├── BackEnd_Laravel/
│   ├── app/
│   │   └── Http/Controllers/
│   │       ├── ProductController.php      (returns JSON)
│   │       ├── UserController.php         (returns JSON)
│   │       ├── CategoryController.php     (returns JSON)
│   │       ├── OrderController.php        (returns JSON)
│   │       ├── BannerController.php       (returns JSON)
│   │       └── CommentController.php      (returns JSON)
│   ├── routes/
│   │   └── api.php                        (API routes)
│   └── bootstrap/
│       └── app.php                        (CORS configured)
│
└── react_lam/my-web/
    ├── src/
    │   ├── services/
    │   │   ├── apiClient.js               (Axios configuration)
    │   │   ├── authService.js
    │   │   ├── productService.js
    │   │   ├── categoryService.js
    │   │   ├── orderService.js
    │   │   ├── bannerService.js
    │   │   └── commentService.js
    │   ├── components/
    │   │   ├── ExampleProductsComponent.jsx
    │   │   └── ExampleLoginComponent.jsx
    │   └── App.js
    ├── .env                               (API URL configuration)
    └── API_INTEGRATION_GUIDE.md           (Detailed API guide)
```

## Next Steps

1. Review `API_INTEGRATION_GUIDE.md` for detailed service usage
2. Check example components for implementation patterns
3. Update your existing components to use API services
4. Add error handling and loading states
5. Consider adding React Query or Redux for state management

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify Laravel server logs
3. Test API endpoints with Postman
4. Check that all environment variables are set correctly
