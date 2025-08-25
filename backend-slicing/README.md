# Laravel API

A simple Laravel API project.

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Install dependencies

```bash
composer install
```

### 2. Generate application key

```bash
php artisan key:generate
```

### 3. Run database migrations

```bash
php artisan migrate
```

### 4. (Optional) Seed the database

```bash
php artisan db:seed
```

### 5. Start the development server

```bash
php artisan serve
```

The application will be available at:

```
http://127.0.0.1:8000
```

---

## ⚙️ Requirements

* PHP >= 8.0
* Composer
* MySQL or any supported database

---

## 📌 Notes

* Ensure your `.env` file is properly configured (DB connection, APP\_URL, etc.) before running migrations.
* You can stop the server anytime with `CTRL+C`.
