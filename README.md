

## Overview
This project is a **React-based** e-commerce platform for showcasing and selling products, with various features such as categories, product listings, image slideshows, zoomed-in image views, modals, and an intuitive user experience for easy navigation. The application is styled with **Tailwind CSS** for a modern, responsive layout.

### Key Features
- **Product Listings** with Category Filtering
- **Product Details** and Image Zoom Modal
- **Carousel for Multiple Images**
- **Responsive Navbar and Sidebar for Categories**
- **Interactive Newsletter and Policies Section**
- **Shopping Cart with State Management**

---

## Project Setup

### Prerequisites
- **Node.js** and **npm** installed on your machine
- A basic understanding of **React** and **JavaScript ES6** syntax

### Steps to Set Up
1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd <project_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Navigate to `http://localhost:3000` to view the app in your browser.

---

## Project Structure

```
src/
│
├── assets/                # Contains images and other static assets
│   ├── about-us/          # Team member images for the About page
│   └── product/           # Product images used across the platform
│
├── components/            # Reusable components used across the app
│   ├── CartModal.jsx      # Modal component for the shopping cart
│   ├── Collection.jsx     # Displays product categories and products
│   ├── Hero.jsx           # Hero banner with background images and messages
│   ├── Navbar.jsx         # Navigation bar with links to various pages
│   ├── Newsletterbox.jsx  # Newsletter subscription form (popup and inline modes)
│   ├── Ourpolicies.jsx    # Policies section displaying return/exchange policies
│   ├── ProductModal.jsx   # Product detail modal with zoom and carousel
│   └── ProductSlider.jsx  # Carousel for displaying multiple product images
│
├── pages/                 # Full pages for different sections of the app
│   ├── About.jsx          # About Us page with team member info
│   ├── Contact.jsx        # Contact page with form and business info
│   ├── HomePage.jsx       # Main page that displays categories and featured products
│
└── App.jsx                # Root component, handles routing and state management
```

---

## Component Breakdown

### 1. `App.jsx`

**Purpose**: Acts as the root component, managing routes, cart state, and shared functions like adding products to the cart.

**State Management**:
- **`cartItems`**: Stores items added to the cart, updated through the `addToCart` function.
  
**Routes**:
- The app uses `react-router-dom` for navigation between pages such as `HomePage`, `Contact`, `About`, and `Collection`.

---

### 2. `HomePage.jsx`

**Purpose**: Displays the main product listing, hero banner, and categories filter.

**Components Used**:
- **Hero**: Displays background banner with promotional messages.
- **Newsletterbox**: An inline or popup subscription box based on user visits.
- **Ourpolicies**: Shows business policies like return/exchange.
- **ProductModal**: A modal popup for viewing product details.

**State**:
- **`visibleProducts`** controls pagination for products.
- **`categoryFilter`** filters products by category.

**Key Functions**:
- `handleAddToCart`: Adds a product to the cart and triggers the `CartModal` to show the added item.
- `handleProductClick`: Opens `ProductModal` with specific product details.

---

### 3. `Hero.jsx`

**Purpose**: Displays the hero banner with promotional messages and a call-to-action button.

**Features**:
- Cycles through promotional messages using an interval with `useEffect`.
  
---

### 4. `Newsletterbox.jsx`

**Purpose**: Collects user emails for subscriptions. Displays either inline or as a popup based on the `mode` prop.

**State**:
- **`marqueeRef`**: Allows smooth scrolling text effect for inline mode.

---

### 5. `Ourpolicies.jsx`

**Purpose**: Displays the company's policies, including support and exchange guarantees, in a modern layout.

---

### 6. `Navbar.jsx`

**Purpose**: Responsive navigation bar that adapts to screen sizes, includes links to main pages, cart status, and profile dropdown.

**Features**:
- Displays the cart icon with a badge indicating the number of items.
- Expands with a sidebar for smaller screens.

**State**:
- **`visible`**: Controls the sidebar visibility on mobile screens.

---

### 7. `Collection.jsx`

**Purpose**: Renders products by category with pagination and displays each product in a card with a zoom-enabled image carousel.

**Features**:
- Paginated product display with the ability to view and navigate categories.
- Integrated `ProductModal` for a detailed view of the selected product.

**State**:
- **`selectedCategory`**: Tracks the active category filter.
- **`currentPage`**: Pagination for products displayed per category.
- **`autoSlideIndex`**: Automatically cycles through product images.

---

### 8. `ProductModal.jsx`

**Purpose**: Provides a detailed view of the product with zoom functionality on hover and a carousel for navigating multiple images.

**Key Features**:
- **Zoom on Hover**: Uses `handleMouseMove` to track cursor position and apply a `transform-origin` for zoom effect.
- **Image Carousel**: Includes `handleNextImage` and `handlePrevImage` functions for navigating through images if more than one exists.

**State**:
- **`currentImageIndex`**: Tracks the index of the image being viewed.
- **`zoomStyle`**: Sets the zoom effect styling based on cursor position.

---

### 9. `ProductSlider.jsx`

**Purpose**: A standalone component for sliding through images in a carousel format, used in `ProductModal` and `Collection`.

**Features**:
- Autoplay functionality that cycles through images every 5 seconds.
- Users can manually control the carousel, which stops auto-sliding on interaction.

---

### 10. `CartModal.jsx`

**Purpose**: Displays the cart's contents, showing added products and allowing users to view their cart status.

**State**:
- No internal state, depends on parent component’s state to display added items.

---

### 11. `About.jsx` and `Contact.jsx`

- **About**: Displays team member information with image, role, and bio.
- **Contact**: Includes a form to contact the business, along with additional details like phone and email.

---

## State Management

### Stateful Components
- `App.jsx`: Manages `cartItems` to store items added to the cart.
- `HomePage.jsx` and `Collection.jsx`: Maintain separate pagination and category filters.
- `ProductModal.jsx`: Controls zoom, carousel, and close functionalities.

### Key Functions and Handlers
- **Adding to Cart**: Managed in `App.jsx` and passed down as a prop to `HomePage` and `Collection`.
- **Filtering and Pagination**: `HomePage` and `Collection` both handle category-based product filtering and pagination.
- **Image Carousel**: `ProductModal` and `ProductSlider` control image transitions, supporting both autoplay and manual navigation.
- **Zoom Effect**: `ProductModal` handles `transform-origin` calculations for zoom functionality based on mouse position.

---
