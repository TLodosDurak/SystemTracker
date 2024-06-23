import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button, StyleSheet } from 'react-native';
import DraggableFlatList, { RenderItemInfo } from 'react-native-draggable-flatlist';
import TaskCard from '@/components/TaskCard';
import { toggleActive, updateTaskOrder } from '@/store/tasksSlice';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootState, Task } from '@/types';
import { Picker } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const systems = useSelector((state: RootState) => state.systems.byId);
  const tasks = useSelector((state: RootState) => state.tasks.byId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedSystemId, setSelectedSystemId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const firstSystemId = Object.keys(systems)[0];
    if (firstSystemId) {
      setSelectedSystemId(firstSystemId);
    }
  }, [systems]);

  const systemTasks = selectedSystemId ? systems[selectedSystemId]?.tasks.map(taskId => tasks[taskId]) : [];

  const renderItem = ({ item, drag, isActive }: RenderItemInfo<Task>) => (
    <TaskCard task={item} onToggle={() => dispatch(toggleActive(item.id))} onLongPress={drag} />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Home Screen</ThemedText>
        <Picker
          value={selectedSystemId}
          enableModalBlur={false}
          onChange={item => item && setSelectedSystemId(item.toString())}
          topBarProps={{ title: "Select a System" }}
          placeholder="Select a System"
          style={{ width: '100%' }}
        >
          {Object.values(systems).map((system) => (
            <Picker.Item key={system.id} value={system.id} label={system.name} />
          ))}
        </Picker>
        {!selectedSystemId && (
          <Button title="Create New System" onPress={() => navigation.navigate('SystemCreation' as never)} />
        )}
      </View>
      <DraggableFlatList
        data={systemTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => {
          // Update the order of tasks in the state
          const updatedTasks = data.map(task => task.id);
          dispatch(updateTaskOrder({ systemId: selectedSystemId || '', taskOrder: updatedTasks }));
        }}
      />
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
    marginTop: 50,
    width: '100%',
  },
});

export default HomeScreen;
