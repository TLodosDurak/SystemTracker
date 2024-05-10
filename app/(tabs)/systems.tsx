// app/(tabs)/index.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import TaskCard from '@/components/TaskCard';
import { toggleActive } from '@/store/taskReducer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';


const SystemsScreen: React.FC = () => {
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
      <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default SystemsScreen;
