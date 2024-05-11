// app/(tabs)/SystemsScreen.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, StyleSheet, View, Button } from 'react-native';
import { RootState } from '@/types';
import { selectSystem } from '@/store/systemsSlice';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SystemCard from '@/components/SystemCard';
import SystemCreation from '@/components/SystemCreation';
import TaskCreation from '@/components/TaskCreation';

const SystemsScreen: React.FC = () => {
  const systems = useSelector((state: RootState) => state.systems);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [activeSystemId, setActiveSystemId] = useState<string | null>(null);

  const handleAddTask = (systemId: string) => {
    setActiveSystemId(systemId);
    setShowTaskModal(true);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Manage Systems</ThemedText>
      <Button title="+ New System" onPress={() => setShowSystemModal(true)} />
      <ScrollView style={styles.scrollContainer}>
        {systems.allIds.map((id) => (
          <SystemCard
            key={id}
            systemId={id}
            onSelect={setActiveSystemId}
            onAddTask={handleAddTask}
          />
        ))}
      </ScrollView>
      <SystemCreation visible={showSystemModal} onClose={() => setShowSystemModal(false)} />
      {activeSystemId && (
        <TaskCreation
          visible={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          systemId={activeSystemId}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  scrollContainer: {
    flex: 1,
  }
});

export default SystemsScreen;
