import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { addSystem } from '@/store/systemsSlice';

interface SystemCreationProps {
  visible: boolean;
  onClose: () => void;
}

const SystemCreation: React.FC<SystemCreationProps> = ({ visible, onClose }) => {
  const [systemName, setSystemName] = useState('');
  const dispatch = useDispatch();

  const handleAddSystem = () => {
    if (systemName) {
      const newSystem = {
        id: uuid.v4().toString(),
        name: systemName,
        tasks: [],
      };
      dispatch(addSystem(newSystem));
      setSystemName('');
      onClose(); // Close the modal after adding
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New System</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter system name"
          value={systemName}
          onChangeText={setSystemName}
        />
        <Button title="Add System" onPress={handleAddSystem} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default SystemCreation;
