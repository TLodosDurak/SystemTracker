// components/TaskCreation.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { useDispatch } from 'react-redux';
import { addTask } from '@/store/tasksSlice';
import { addTaskToSystem } from '@/store/systemsSlice';
import { Picker } from '@react-native-picker/picker';


interface TaskCreationProps {
    visible: boolean;
    onClose: () => void;
    systemId: string;
  }

const TaskCreation: React.FC<TaskCreationProps> = ({ visible, onClose, systemId }) => {
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (taskName && totalSeconds > 0) {
      const newTask = {
        id: uuid.v4().toString(),
        name: taskName,
        durationSeconds: totalSeconds,
        isActive: false,
        lastActiveDate: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
      dispatch(addTaskToSystem({ systemId, taskId: newTask.id })); // Link task to system
      setTaskName('');
      //setDuration(''); // Assuming duration is a string; adjust if using separate state hooks for hours, minutes, seconds
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      onClose(); // Close the modal after adding
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />
        {/* Duration Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={hours}
            style={styles.picker}
            onValueChange={(itemValue) => setHours(itemValue)}>
            {[...Array(24).keys()].map(h => (
              <Picker.Item key={h} label={`${h} hrs`} value={h} />
            ))}
          </Picker>
          <Picker
            selectedValue={minutes}
            style={styles.picker}
            onValueChange={(itemValue) => setMinutes(itemValue)}>
            {[...Array(60).keys()].map(m => (
              <Picker.Item key={m} label={`${m} min`} value={m} />
            ))}
          </Picker>
          <Picker
            selectedValue={seconds}
            style={styles.picker}
            onValueChange={(itemValue) => setSeconds(itemValue)}>
            {[...Array(60).keys()].map(s => (
              <Picker.Item key={s} label={`${s} sec`} value={s} />
            ))}
          </Picker>
        </View>
        <Button title="Add Task" onPress={handleAddTask} />
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
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  picker: {
    flex: 1,
  }
});

export default TaskCreation;
