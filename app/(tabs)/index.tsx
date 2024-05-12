// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import TaskCard from '@/components/TaskCard';
import { toggleActive } from '@/store/tasksSlice';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText} from '@/components/ThemedText';

import { RootState } from '@/types';

const HomeScreen: React.FC = () => {
  const systems = useSelector((state: RootState) => state.systems.byId);
  const tasks = useSelector((state: RootState) => state.tasks.byId);
  const dispatch = useDispatch();
  const [selectedSystemId, setSelectedSystemId] = useState<string | undefined>(undefined);

  const systemTasks = selectedSystemId ? systems[selectedSystemId]?.tasks.map(taskId => tasks[taskId]) : [];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Home Screen</ThemedText>
        <Picker
          selectedValue={selectedSystemId}
          style={{ height: 50, width: '30%'}}
          onValueChange={(itemValue) => setSelectedSystemId(itemValue)}
        >
          {Object.values(systems).map((system) => (
            <Picker.Item key={system.id} label={system.name} value={system.id} />
          ))}
        </Picker>
      </View> 
      <ScrollView>
        {systemTasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={() => dispatch(toggleActive(task.id))} />
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:30,
  },
});

export default HomeScreen;
