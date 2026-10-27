# DeadEye Laser Works

**Link:** [https://deadeyelaserworks.onrender.com]

DeadEye Laser Works is an e-commerce website for a laser engraving business. This platform allows users to browse and order services, while admins can manage services and view user orders.

## Tech Stack

- **Database:** PostgreSQL
- **Backend:** Express.js, Node.js
- **Frontend:** React, Vite

## Entity Relationship Diagram(ERD)

<img src="/schema.png" alt="Entity relationship diagram for Deadeye laser Works">

## Features

### Admin Page

**Admin Login info**
username: adminUser
password: password

- **Service Management:**
  - Create new services or deactivate existing services, such as deals.
- **Order Management:**
  - View user orders.
  - Mark orders as complete or adjust the price if the service requires more resources than anticipated.

### User Page

- **Order History:**
  - Users can view their order history.
- **Profile Management:**
  - Users can update their profile information.

## Installation and Setup

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository>
   ```

2. **Inside backend dir**

   ```bash
   npm i
   ```

3. **Inside frontend dir**

   ```bash
   npm i
   ```

4. **After installing all libraries in both dir**

   ```bash
   npm run dev
   ```

**Future improvements/implementations**

- Implemenet a support ticket system
- Implement a checkout system
- Improve styling
