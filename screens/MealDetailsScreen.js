import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useOrderContext } from '../context/OrderContext';

const MealDetailsScreen = ({ route, navigation }) => {
  const { meal } = route.params;
  const { addOrder } = useOrderContext();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
    });
  }, [navigation, meal.title]);

  const handleOrderNow = () => {
    const order = addOrder(meal);
    navigation.navigate('OrderConfirmation', { order });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{meal.title}</Text>
        <Text style={styles.price}>${meal.price.toFixed(2)}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {meal.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.ingredient}>{ingredient}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.orderButton}
          onPress={handleOrderNow}
        >
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f54242',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#666',
  },
  ingredient: {
    fontSize: 16,
    color: '#666',
  },
  orderButton: {
    backgroundColor: '#f54242',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MealDetailsScreen; 