import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { productApi } from '../services/api';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productApi.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleImageScroll}
            scrollEventThrottle={16}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.title}>{product.title}</Text>
          
          {/* Price Section */}
          <View style={styles.priceSection}>
            <View>
              <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
              {product.discountPercentage > 0 && (
                <View style={styles.discountContainer}>
                  <Text style={styles.originalPrice}>${product.price}</Text>
                  <Text style={styles.discount}>-{product.discountPercentage}%</Text>
                </View>
              )}
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#f39c12" />
              <Text style={styles.rating}>{product.rating}</Text>
            </View>
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <Text style={[
              styles.stockStatus,
              product.stock > 10 ? styles.inStock : styles.lowStock
            ]}>
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Product Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>SKU:</Text>
              <Text style={styles.detailValue}>{product.sku}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Weight:</Text>
              <Text style={styles.detailValue}>{product.weight} kg</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dimensions:</Text>
              <Text style={styles.detailValue}>
                {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
              </Text>
            </View>
          </View>

          {/* Shipping & Warranty */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping & Returns</Text>
            <View style={styles.infoRow}>
              <Ionicons name="cube-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{product.shippingInformation}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{product.warrantyInformation}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="return-down-back-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{product.returnPolicy}</Text>
            </View>
          </View>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsContainer}>
                {product.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Buy Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: width,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  brand: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 8,
    marginBottom: 16,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#27ae60',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: '#e74c3c',
    backgroundColor: '#ffe4e4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 4,
  },
  stockContainer: {
    marginBottom: 20,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  inStock: {
    color: '#27ae60',
  },
  lowStock: {
    color: '#e74c3c',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProductDetailScreen; 