import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useOrderContext } from '../context/OrderContext';

const OrdersScreen = () => {
  const { orders } = useOrderContext();

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    return (
      <View style={styles.orderItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={styles.orderPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.orderDate}>{formattedDate} at {formattedTime}</Text>
        </View>
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No orders yet</Text>
      <Text style={styles.emptySubtext}>Start ordering delicious meals!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={renderOrderItem}
        contentContainerStyle={[
          styles.listContainer,
          orders.length === 0 && styles.emptyListContainer
        ]}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  emptyListContainer: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  orderImage: {
    width: 100,
    height: 100,
  },
  orderInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f54242',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bbb',
  },
});

export default OrdersScreen; 