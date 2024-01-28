# Online Clothing Shop

Welcome to **Shop.co**, your go-to online clothing shop! This repository contains the source code for the web
application, built with React for the frontend and Express for the backend.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- **User Authentication:** Secure user registration and login functionality.
- **Product Catalog:** Browse through a wide range of clothing items with detailed information.
- **Shopping Cart:** Add products to your cart and proceed to checkout.
- **Order Management:** View and track your order history.
- **Responsive Design:** Enjoy a seamless experience on both desktop and mobile devices.
- **Admin Panel:** Manage products, users, and orders with ease.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- yarn: [https://yarnpkg.com/](https://yarnpkg.com/)
- MongoDB: [https://www.mongodb.com/try/download/community/](https://www.mongodb.com/try/download/community/)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/maks-kovpak/online-clothing-shop.git
    ```

2. Navigate to the project directory and install dependencies:

    ```bash
    cd online-clothing-shop
    yarn install
    ```

3. Configure environment variables:

    - Create a `.env` file in both the `client` and `server` directores
    - Copy the content of the `dist.env` file to your local `.env` file (in each directory)
    - Set custom values for some variables

4. Start the development servers:

    - For the client:

        ```bash
        yarn client:dev
        ```

    - For the server:

        ```bash
        yarn server:dev
        ```

5. Visit [http://localhost:5173](http://localhost:5173) in your browser to access the application.

## Folder Structure

The project is organized into two main directories:

- **client:** Contains the React frontend code.
- **server:** Houses the Express backend code.

Feel free to explore each directory for more details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.