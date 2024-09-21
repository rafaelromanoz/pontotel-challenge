import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface LogoutModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Você tem certeza que deseja sair?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#79397D',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#FCCC31',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LogoutModal;
