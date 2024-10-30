# Bazar.com - World's Smallest Book Store

**Bazar.com** is a simple bookstore web application designed as a two-tier microservices architecture. The application supports the sale of four books with minimal features and RESTful communication between components.

## Project Description

This project employs a two-tier architecture with microservices. The application consists of the following main components:

1. **Frontend Service**: Handles user requests and communicates with backend services (I use Postman for testing).
2. **Catalog Service**: Manages the book inventory, including book information and stock.
3. **Order Service**: Processes purchase requests and maintains order details.

## Features

- **Search**: Search for books by topic and view available options.
- **Info**: Get detailed information about a specific book, such as stock and price.
- **Purchase**: Purchase a book and update stock accordingly.

## Technologies Used

- **Node.js** with **Express.js** for backend services
- **Sequelize ORM** for database management
- **SQLite** as a lightweight database
- **MVC Pattern** for code organization
- **Docker** for containerization and environment management
- RESTful API design for communication

## Architecture Overview

The application uses a microservices architecture:

- **Frontend Service**:
    - Handles requests from clients.
    - Communicates with Catalog and Order services using REST API calls.

- **Catalog Service**:
    - Manages books, stock, and categories.
    - Supports search, info, and updates for books.

- **Order Service**:
    - Processes purchase requests.
    - Verifies stock availability and updates the book inventory.

## REST API Endpoints

### Catalog Service

1. **GET** `catalog/search/:topic` - Returns a list of books belonging to a specific topic.
    ```json
    [
      {
        "id": 1,
        "title": "How to get a good grade in DOS in 40 minutes a day"
      },
      {
        "id": 2,
        "title": "RPCs for Noobs"
      }
    ]
    ```

2. **GET** `catalog/info/:itemNumber` - Returns detailed information for a specific book.
    ```json
    {
      "title": "RPCs for Noobs",
      "quantity": 5,
      "price": 50
    }
    ```

3. **PUT** `catalog/update/:itemNumber` - Updates the cost or quantity of a book in stock (requires JSON body).

### Order Service

1. **POST** `order/purchase/:id` - Purchases a book by decreasing its stock by one.
    - Validates if the book is in stock before proceeding.
    - Records the purchase in the `Order` table.
    ```json
    {
      "message": "Book purchased successfully",
      "order": {
        "bookId": 1,
        "quantity": 1
      }
    }
    ```

2. **PUT** `order/update-stock/:id` - Updates the stock of a specific book.
    - Uses a helper function to update the book's stock in the catalog.
    ```json
    {
      "message": "Book stock updated successfully"
    }
    ```

## Database Schema

### Catalog Table

| Column   | Type   | Description                           |
|----------|--------|---------------------------------------|
| id       | INTEGER| Primary key for each book             |
| title    | TEXT   | Book title                            |
| quantity | INTEGER| Number of books in stock              |
| price    | REAL   | Price of each book                    |
| topic    | TEXT   | Book topic (e.g., 'distributed systems' or 'undergraduate school')|

### Orders Table

| Column      | Type    | Description                       |
|-------------|---------|-----------------------------------|
| id          | INTEGER | Primary key for each order        |
| bookId      | INTEGER | ID of the purchased book          |
| quantity    | INTEGER | Quantity of the book ordered      |

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/bazar-com.git
   cd bazar-com
