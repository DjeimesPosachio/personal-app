/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {List} from 'react-native-paper';

const TreinoScreen = () => {
  const treinos = [
    {
      id: 'A',
      titulo: 'Treino A',
      descricao: 'Peito e tríceps',
      exercicios: [
        {nome: 'Supino', series: 5, repeticoes: 12},
        {nome: 'Crucifixo', series: 5, repeticoes: 12},
        {nome: 'Paralelas', series: 5, repeticoes: 12},
        {nome: 'Tríceps Pulley', series: 5, repeticoes: 12},
      ],
    },
    {
      id: 'B',
      titulo: 'Treino B',
      descricao: 'Costas e bíceps',
      exercicios: [
        {nome: 'Barra fixa', series: 5, repeticoes: 12},
        {nome: 'Puxada alta', series: 5, repeticoes: 12},
        {nome: 'Rosca direta', series: 5, repeticoes: 12},
        {nome: 'Rosca martelo', series: 5, repeticoes: 12},
      ],
    },
    {
      id: 'C',
      titulo: 'Treino C',
      descricao: 'Pernas',
      exercicios: [
        {nome: 'Agachamento', series: 5, repeticoes: 12},
        {nome: 'Leg press', series: 5, repeticoes: 12},
        {nome: 'Cadeira extensora', series: 5, repeticoes: 12},
        {nome: 'Cadeira flexora', series: 5, repeticoes: 12},
      ],
    },
    {
      id: 'D',
      titulo: 'Treino D',
      descricao: 'Ombros e trapézio',
      exercicios: [
        {nome: 'Desenvolvimento militar', series: 5, repeticoes: 12},
        {nome: 'Elevação lateral', series: 5, repeticoes: 12},
        {nome: 'Remada alta', series: 5, repeticoes: 12},
        {nome: 'Encolhimento de ombros', series: 5, repeticoes: 12},
      ],
    },
    {
      id: 'E',
      titulo: 'Treino E',
      descricao: 'Cardio e abs',
      exercicios: [
        {nome: 'Corrida', series: 5, repeticoes: 12},
        {nome: 'Caminhada', series: 5, repeticoes: 12},
        {nome: 'Prancha', series: 5, repeticoes: 12},
        {nome: 'Abdominal', series: 5, repeticoes: 12},
      ],
    },
  ];

  const renderItem = ({item}) => (
    <List.Accordion
      key={item.id}
      title={item.titulo}
      description={item.descricao}
      style={styles.card}
      titleStyle={{color: 'white'}}>
      {item.exercicios.map((exercicio, index) => (
        <List.Item
          key={index}
          title={`${exercicio.nome} - ${exercicio.series} x ${exercicio.repeticoes}`}
          titleStyle={{color: 'white'}}
        />
      ))}
    </List.Accordion>
  );

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={treinos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1F222A',
    padding: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#181A20',
  },
});

export default TreinoScreen;
