import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [activeTab, setActiveTab] = useState('inProgress');
  const [newTaskText, setNewTaskText] = useState('');
  const [inProgressTasks, setInProgressTasks] = useState([
    { id: '1', text: 'Learn React Native' },
    { id: '2', text: 'Build a Todo App' },
    { id: '3', text: 'Submit Assignment' },
  ]);
  const [completedTasks, setCompletedTasks] = useState([
    { id: '4', text: 'Set up Expo' },
  ]);

  const [lastTap, setLastTap] = useState(null);

  const handleTaskPress = (taskId, fromList) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      // Double tap detected
      if (fromList === 'inProgress') {
        const task = inProgressTasks.find(t => t.id === taskId);
        if (task) {
          setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
          setCompletedTasks([...completedTasks, task]);
        }
      } else {
        const task = completedTasks.find(t => t.id === taskId);
        if (task) {
          setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
          setInProgressTasks([...inProgressTasks, task]);
        }
      }
      setLastTap(null);
    } else {
      setLastTap(now);
    }
  };

  const handleCreateTask = () => {
    if (newTaskText.trim() === '') {
      Alert.alert('Error', 'Please enter a task description');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
    };

    setInProgressTasks([...inProgressTasks, newTask]);
    setNewTaskText('');
  };

  const handleDeleteTask = (taskId, fromList) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (fromList === 'inProgress') {
              setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
            } else {
              setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
            }
          },
        },
      ]
    );
  };

  const renderTask = ({ item, fromList }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        onPress={() => handleTaskPress(item.id, fromList)}
        style={styles.taskItem}
        activeOpacity={0.7}
      >
        <Text style={[styles.taskText, fromList === 'completed' && styles.completedText]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDeleteTask(item.id, fromList)}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>

      {/* Create Task Section */}
      <View style={styles.createTaskContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a new task..."
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={handleCreateTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleCreateTask}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
          onPress={() => setActiveTab('inProgress')}
        >
          <Text style={[styles.tabText, activeTab === 'inProgress' && styles.activeTabText]}>
            In Progress ({inProgressTasks.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed ({completedTasks.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <View style={styles.listContainer}>
        {activeTab === 'inProgress' ? (
          <FlatList
            data={inProgressTasks}
            renderItem={({ item }) => renderTask({ item, fromList: 'inProgress' })}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No tasks in progress</Text>
            }
          />
        ) : (
          <FlatList
            data={completedTasks}
            renderItem={({ item }) => renderTask({ item, fromList: 'completed' })}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No completed tasks</Text>
            }
          />
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Double-tap to move tasks • Tap × to delete tasks
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4a90e2',
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  createTaskContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4a90e2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
  instructions: {
    backgroundColor: '#e8f4f8',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#d0e8f0',
  },
  instructionText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});
