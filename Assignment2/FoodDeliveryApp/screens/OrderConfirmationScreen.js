import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const OrderConfirmationScreen = ({ route, navigation }) => {
  const { order } = route.params;

  const handleViewOrders = () => {
    navigation.navigate('OrdersTab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>Your order has been placed successfully</Text>
        
        <View style={styles.orderDetails}>
          <Image source={{ uri: order.imageUrl }} style={styles.mealImage} />
          <Text style={styles.mealTitle}>{order.title}</Text>
          <Text style={styles.mealPrice}>${order.price.toFixed(2)}</Text>
          <Text style={styles.orderId}>Order ID: #{order.orderId}</Text>
        </View>

        <TouchableOpacity 
          style={styles.viewOrdersButton}
          onPress={handleViewOrders}
        >
          <Text style={styles.buttonText}>View Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#42f554',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  orderDetails: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  mealImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  mealPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f54242',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    color: '#999',
  },
  viewOrdersButton: {
    backgroundColor: '#f54242',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#f54242',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderConfirmationScreen; 