# Bazar.com - World's Smallest Book Store

**Bazar.com** is a simple bookstore web application designed with a two-tier microservices architecture. The application supports basic functionalities for book management, including search, viewing, and purchasing books.

## Project Description

This project employs a two-tier architecture with microservices. The application consists of the following main components:

1. **Frontend Service**: Manages user requests and interacts with backend services (tested via Postman).
2. **Catalog Service**: Manages the book inventory, including details and stock availability.
3. **Order Service**: Processes purchase requests and updates the stock for each order.

## Features

- **Search**: Search books by topic and view available options.
- **Info**: Get detailed information about specific books, such as stock and price.
- **Purchase**: Purchase a book, which updates stock and order details.
- **API Documentation**: Interactive API documentation via Swagger UI.
- **Caching**: Redis is used to cache frequently accessed book information to improve performance.
- **Load Balancing**: Load balancer implemented using Nginx to distribute requests evenly across instances of Catalog and Order services.

## Technologies Used

- **Node.js** with **Express.js** for backend services.
- **Sequelize ORM** for database management.
- **SQLite** as a lightweight database.
- **Redis** for caching to enhance performance.
- **Nginx** for load balancing.
- **Swagger UI** for API documentation.
- **Docker** for containerization.

## Architecture Overview

The application follows a microservices architecture:

- **Frontend Service**:
    - Receives client requests and relays them to Catalog and Order services through REST APIs.

- **Catalog Service**:
    - Manages book catalog and stock.
    - Caches frequently accessed data using Redis to reduce database calls.

- **Order Service**:
    - Processes book purchases.
    - Updates the stock in the catalog and records orders.

- **Nginx Load Balancer**:
    - Distributes incoming requests across instances of Catalog and Order services to improve scalability and handle high traffic.

## REST API Endpoints

### Catalog Service

1. **GET** `/catalog/search/:topic` - Retrieves a list of books by topic.
    ```json
    [
      { "id": 1, "title": "How to get a good grade in DOS in 40 minutes a day" },
      { "id": 2, "title": "RPCs for Noobs" }
    ]
    ```

2. **GET** `/catalog/info/:itemNumber` - Retrieves detailed information for a specific book.
    ```json
    {
      "title": "RPCs for Noobs",
      "quantity": 5,
      "price": 50
    }
    ```

3. **PUT** `/catalog/update/:itemNumber` - Updates book details, including cost or quantity.

### Order Service

1. **POST** `/order/purchase/:id` - Processes a book purchase and reduces stock.
    ```json
    {
      "message": "Book purchased successfully",
      "order": {
        "bookId": 1,
        "quantity": 1
      }
    }
    ```

2. **PUT** `/order/update-stock/:id` - Updates the stock for a specific book.

## Database Schema

### Catalog Table

| Column   | Type     | Description                           |
|----------|----------|---------------------------------------|
| id       | INTEGER  | Primary key for each book            |
| title    | TEXT     | Title of the book                    |
| quantity | INTEGER  | Quantity in stock                    |
| price    | REAL     | Price of each book                   |
| topic    | TEXT     | Topic of the book                    |

### Orders Table

| Column   | Type     | Description                           |
|----------|----------|---------------------------------------|
| id       | INTEGER  | Primary key for each order           |
| bookId   | INTEGER  | ID of the book ordered               |
| quantity | INTEGER  | Quantity purchased                   |

## Caching and Load Balancing

### Caching with Redis

- Frequently accessed data, such as book details and availability, are stored in Redis to improve response time and reduce load on the SQLite database.
- Redis caching is applied on endpoints like `/catalog/info/:itemNumber` to return results faster for repeated requests.

### Load Balancing with Nginx

- Nginx is configured as a load balancer to evenly distribute requests across multiple instances of the **Catalog** and **Order** services.
- This setup allows the application to handle higher traffic efficiently, ensuring better uptime and scalability.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bazar-com.git
   cd bazar-com
