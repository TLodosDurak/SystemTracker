// app/(tabs)/index.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import TaskCard from '@/components/TaskCard';
import { toggleActive } from '@/store/tasksSlice'; // Updated import path
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootState } from '@/types';

const HomeScreen: React.FC = () => {
  const tasks = useSelector((state: RootState) => Object.values(state.tasks.byId)); // Adjusted to fetch tasks from byId object
  const dispatch = useDispatch();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home Screen</ThemedText>
      <ScrollView>
        {tasks.map((task) => (
          <TaskCard key={task.id.toString()} task={task} onToggle={() => dispatch(toggleActive(task.id))} />
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
});

export default HomeScreen;
