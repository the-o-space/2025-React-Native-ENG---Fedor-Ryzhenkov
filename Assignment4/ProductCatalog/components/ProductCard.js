import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.discount}>-{product.discountPercentage.toFixed(0)}%</Text>
          )}
        </View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={onPress}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  category: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
  },
  discount: {
    fontSize: 12,
    color: '#e74c3c',
    marginLeft: 8,
    backgroundColor: '#ffe4e4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductCard; 