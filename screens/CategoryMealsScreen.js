import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MEALS } from '../data/data';

const CategoryMealsScreen = ({ route, navigation }) => {
  const { categoryId, categoryTitle } = route.params;

  const displayedMeals = MEALS.filter(meal => 
    meal.categoryIds.includes(categoryId)
  );

  const renderMealItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => navigation.navigate('MealDetails', {
          meal: item
        })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
        <View style={styles.mealInfo}>
          <Text style={styles.mealTitle}>{item.title}</Text>
          <Text style={styles.mealPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [navigation, categoryTitle]);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        contentContainerStyle={styles.listContainer}
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
  mealItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f54242',
  },
});

export default CategoryMealsScreen; 