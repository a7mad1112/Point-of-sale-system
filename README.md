# Point of Sale (POS) Project

## Overview
The Point of Sale (POS) project is a web application designed to facilitate sales and product management for supermarkets. It includes features such as managing products, product categories, unit of measures, and multiple carts for customers. The system allows users to add, update, and delete products, view and manage product categories and unit of measures, and create and manage multiple carts for customers' purchases. The project also includes a login page for authentication.

## Pages
### Products Page
The Products page displays a list of all products in the system. Users can view, add, update, or delete products from this page. Each product includes properties such as product name, product code, category, image, price, and unit of measure.

### Product Categories Page
The Product Categories page displays a list of all product categories in the system. Users can view, add, update, or delete product categories from this page.

### Unit Of Measure Page
The Unit Of Measure page displays a list of all unit of measures in the system. Users can view, add, update, or delete unit of measures from this page. Each unit of measure includes properties such as name, base unit of measure, and conversion factor to the base unit of measure.

### POS Page
The POS page is used by cashiers to manage customers' carts. Cashiers can create and manage multiple carts, each with a unique identifier. Each cart can have a custom description added to it. Cashiers can add products to the cart, change the quantity of added products, delete products from the cart, edit the applied tax, and apply discounts. The list of products is searchable and filterable by product category. Each cart has a checkout button to complete the cart.

### Cart Page
The Cart page allows users to view and manage the items in their cart. Users can delete products from the cart and adjust the quantity of each product. The page also displays the total amount, including tax and discounts, and provides a checkout button to complete the purchase.

#### Features:
- Display a list of products in the cart.
- For each product, show the product name, quantity, price, and subtotal (quantity * price).
- Allow users to delete products from the cart.
- Enable users to adjust the quantity of each product in the cart.
- Calculate the total amount, including tax and discounts.
- Provide input fields for users to enter tax and apply discounts to the cart.
- Display the updated total amount after applying tax and discounts.
- Include a checkout button to complete the purchase.

### Product Page
Each product has a dedicated page to display its details, including product name, code, price, category, unit of measure, and images. The Product page provides additional information and allows users to view and update the product details.

#### Features:
- Display the product name, code, price, category, unit of measure, and any other relevant details.
- Show the product images, allowing users to view them in a gallery or carousel format.
- Provide an option to update the product details, such as name, price, category, etc., with appropriate form inputs.
- Allow users to upload multiple images for the product, if required.
- Include buttons or links to perform actions like editing or deleting the product if the user has the necessary permissions.

### Login Page
The Login page provides authentication functionality. Users can log in using their credentials to access the application. This page ensures that unauthorized users cannot access the system's features.

## Technical Details
- React for rendering the UI.
- Formik for handling forms state.
- react-router for navigation and router management.
- TypeScript for type checking.
- Redux for state management.
- Git used for version control.
- A sideBar implemented for navigation between pages, such as a side navbar or a top app ribbon.
- A server side using Strapi.js.
- Unit testing(rtl).

## Installation and Usage
To set up and run the POS project, follow these steps:

+ Clone the project repository.
- Install the dependencies for the server application by navigating to the pos-server directory and running npm install.
- Start the server application by running npm run develop.
- Install the dependencies for the client application by navigating to the pos directory and running npm install.
- Start the client application by running npm start.
- Access the POS system by opening a web browser and navigating to the specified URL.

