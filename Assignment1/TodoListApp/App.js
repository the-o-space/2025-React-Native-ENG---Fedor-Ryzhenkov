import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [activeTab, setActiveTab] = useState('inProgress');
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

  const renderTask = ({ item, fromList }) => (
    <TouchableOpacity
      onPress={() => handleTaskPress(item.id, fromList)}
      style={styles.taskItem}
      activeOpacity={0.7}
    >
      <Text style={[styles.taskText, fromList === 'completed' && styles.completedText]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inProgress' && styles.activeTab]}
          onPress={() => setActiveTab('inProgress')}
        >
          <Text style={[styles.tabText, activeTab === 'inProgress' && styles.activeTabText]}>
            In Progress
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
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
          Double-tap a task to move it between lists
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
  taskItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
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
