import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface TaskCardProps {
  task: {
    id: string;
    name: string;
    isActive: boolean;
    totalTimeSpent: number;
  };
  onToggle: () => void;
  onLongPress?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const [elapsedTime, setElapsedTime] = useState(task.totalTimeSpent);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (task.isActive) {
      interval = setInterval(() => {
        setElapsedTime(elapsed => elapsed + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [task.isActive]);

  useEffect(() => {
    setElapsedTime(task.totalTimeSpent);
  }, [task.totalTimeSpent]);

  const formatTime = (): string => {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.card, { backgroundColor: task.isActive ? '#4CAF50' : '#F5F5F5' }]}>
      <Text>{task.name}</Text>
      <Text>Elapsed Time: {formatTime()}</Text>
      <Pressable onPress={onToggle}>
        <Text>{task.isActive ? "Stop" : "Start"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TaskCard;
