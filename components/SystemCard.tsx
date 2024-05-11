// components/SystemCard.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import TaskCard from '@/components/TaskCard';

interface SystemCardProps {
  systemId: string;
  onSelect: (systemId: string) => void;
  onAddTask: (systemId: string) => void; // Callback when adding task
}

const SystemCard: React.FC<SystemCardProps> = ({ systemId, onSelect, onAddTask }) => {
  const system = useSelector((state: RootState) => state.systems.byId[systemId]);
  const tasks = useSelector((state: RootState) => state.tasks.byId);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    onSelect(systemId);
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={toggleDetails}>
        <Text style={styles.text}>{system.name}</Text>
      </Pressable>
      {showDetails && (
        <ScrollView style={styles.taskList}>
          {system.tasks.map((taskId) => (
            <TaskCard
              key={taskId}
              task={tasks[taskId]}
              onToggle={() => {/* Define what happens when a task is toggled */}}
            />
          ))}
          <Button title="+ Create New Task" onPress={() => onAddTask(systemId)} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
  },
  taskList: {
    marginTop: 10,
  }
});

export default SystemCard;
