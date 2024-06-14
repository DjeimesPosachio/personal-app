/* eslint-disable prettier/prettier */
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ModalObservacao = ({exercicio, onClose}) => {
  return (
    <Modal visible={exercicio !== null} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.observacaoText}>{exercicio?.observacao}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.fecharText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1F222A',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  observacaoText: {
    color: 'white',
    fontSize: 20,
  },
  fecharText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
});

export default ModalObservacao;
