// components/TaskCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface TaskCardProps {
  task: {
    id: number;
    name: string;
    durationSeconds: number;
    isActive: boolean;
  };
  onToggle: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(task.durationSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (task.isActive) {
      interval = setInterval(() => {
        setSecondsRemaining(seconds => seconds > 0 ? seconds - 1 : 0);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [task.isActive]);

  useEffect(() => {
    setSecondsRemaining(task.durationSeconds);
  }, [task.durationSeconds]);

  const formatTime = (): string => {
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.card, { backgroundColor: task.isActive ? '#4CAF50' : '#F5F5F5' }]}>
      <Text>{task.name}</Text>
      <Text>Duration: {formatTime()}</Text>
      <Pressable onPress={onToggle}>
        <Text>{task.isActive ? "Pause" : "Start"}</Text>
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
