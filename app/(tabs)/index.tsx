// app/(tabs)/index.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import TaskCard from '@/components/TaskCard';
import { toggleActive } from '@/store/taskReducer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen: React.FC = () => {
  const tasks = useSelector((state: any) => state.tasks.tasks);  // Use your RootState type here instead of any
  const dispatch = useDispatch();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">New Task +</ThemedText>
      <ScrollView>
        {tasks.map((task: any) => (  // Use your Task type here instead of any
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
