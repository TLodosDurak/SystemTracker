import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Picker } from 'react-native-ui-lib';
import TaskCard from '@/components/TaskCard';
import { toggleActive } from '@/store/tasksSlice';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

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
          value={selectedSystemId}
          enableModalBlur={false}
          onChange={item =>{ item && setSelectedSystemId(item.toString())}}  
          topBarProps={{title: "Select a System"}}
          placeholder="Select a System"
          style={{ width: '100%' }}
        >
          {Object.values(systems).map((system) => (
            <Picker.Item key={system.id} value={system.id} label={system.name} />
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
    marginTop: 30,
    width: '100%',
  },
});

export default HomeScreen;
