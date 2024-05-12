import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View, Button } from 'react-native';
import { RootState } from '@/types';
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
      <View style={styles.header}>
        <ThemedText type="title">Manage Systems</ThemedText>
        <Button title="+ New System" onPress={() => setShowSystemModal(true)} />
      </View>
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
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:30,
  },
});

export default SystemsScreen;
