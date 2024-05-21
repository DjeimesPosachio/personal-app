/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { List } from 'react-native-paper';

const DietaScreen = () => {
    const dietas = [
        {
            id: '1',
            titulo: 'Dieta 1',
            descricao: 'Refeições balanceadas para ganho de massa muscular',
            alimentos: ['Frango grelhado', 'Arroz integral', 'Brócolis', 'Ovos'],
        },
        {
            id: '2',
            titulo: 'Dieta 2',
            descricao: 'Refeições leves para perda de peso',
            alimentos: ['Salada verde', 'Salmão grelhado', 'Quinoa', 'Frutas'],
        },
        {
            id: '3',
            titulo: 'Dieta 3',
            descricao: 'Dieta vegetariana para saúde geral',
            alimentos: ['Feijão', 'Lentilha', 'Tofu', 'Espinafre'],
        },
        {
            id: '4',
            titulo: 'Dieta 4',
            descricao: 'Dieta cetogênica para queima de gordura',
            alimentos: ['Carne vermelha', 'Abacate', 'Queijo', 'Azeite de oliva'],
        },
        {
            id: '5',
            titulo: 'Dieta 5',
            descricao: 'Dieta rica em fibras para melhor digestão',
            alimentos: ['Aveia', 'Maçã', 'Sementes de chia', 'Legumes'],
        },
    ];

    const renderItem = ({ item }) => (
        <List.Accordion
            key={item.id}
            title={item.titulo}
            description={item.descricao}
            style={styles.card}
            titleStyle={{ color: 'white' }}>
            {item.alimentos.map((alimento, index) => (
                <List.Item key={index} title={alimento} titleStyle={{ color: 'white' }} />
            ))}
        </List.Accordion>
    );

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FlatList
                    data={dietas}
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

export default DietaScreen;
