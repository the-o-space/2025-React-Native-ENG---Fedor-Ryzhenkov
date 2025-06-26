# Assignment 4: Product Catalog App

A React Native e-commerce product catalog application that displays products from the DummyJSON API with search functionality and detailed product views.

## Features

### Product List Screen
- **Grid Layout**: Products displayed in a 2-column grid layout
- **Real-time Search**: Filter products by name as you type
- **Product Cards**: Each card shows:
  - Product image
  - Product name
  - Category
  - Price with discount percentage
  - "View Details" button
- **Pull to Refresh**: Reload products with pull-down gesture
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error messages

### Product Detail Screen
- **Image Carousel**: Swipeable product images with indicators
- **Product Information**:
  - Name, brand, and category
  - Current price and original price (if discounted)
  - Star rating
  - Stock status indicator
- **Detailed Sections**:
  - Product description
  - Product specifications (SKU, weight, dimensions)
  - Shipping information
  - Warranty details
  - Return policy
  - Product tags
- **Add to Cart button** (UI only)

## Technical Implementation

### API Integration
- Uses DummyJSON Products API: https://dummyjson.com/products
- Implements three API methods:
  - `getAllProducts()`: Fetch all products with pagination support
  - `getProductById()`: Fetch single product details
  - `searchProducts()`: Search products by query

### Navigation
- React Navigation with Stack Navigator
- Smooth transitions between list and detail views
- Custom header styling

### State Management
- Local component state with React hooks
- Real-time search filtering
- Loading and error states

### UI/UX Features
- Responsive design
- Shadow effects for depth
- Color-coded stock status
- Discount badges
- Image lazy loading
- Smooth scrolling

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd Assignment4/ProductCatalog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

4. Choose your platform:
   - Press `i` for iOS
   - Press `a` for Android
   - Press `w` for web

## Project Structure

```
ProductCatalog/
├── App.js                    # Main app component with navigation
├── screens/
│   ├── ProductListScreen.js  # Product grid with search
│   └── ProductDetailScreen.js # Individual product details
├── components/
│   └── ProductCard.js        # Reusable product card component
└── services/
    └── api.js                # API service for DummyJSON
```

## Dependencies

- `@react-navigation/native`: Navigation framework
- `@react-navigation/native-stack`: Stack navigator
- `react-native-screens`: Native navigation primitives
- `react-native-safe-area-context`: Safe area handling
- `@expo/vector-icons`: Icon library

## Future Enhancements

- Add category filtering
- Implement pagination for large product lists
- Add to cart functionality with state management
- User authentication
- Product reviews section
- Price range filtering
- Sort options (price, rating, etc.) 