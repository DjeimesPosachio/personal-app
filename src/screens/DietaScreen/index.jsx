/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { List } from 'react-native-paper';
import { createAxios } from '../../utils/axios-helper';

const DietaScreen = () => {
    const [loading, setLoading] = useState(false);
    const [planejamento, setPlanejamento] = useState({});

    const axios = createAxios();

    const requestData = useCallback(() => {
      setLoading(true);
      axios
        .get('/planejamento-dieta')
        .then(response => {
          setPlanejamento(response?.data);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [axios]);

    useEffect(() => {
      requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefresh = useCallback(() => {
      requestData();
    }, [requestData]);

    const renderItem = ({ item }) => (
        <List.Accordion
            key={item.id}
            title={item.titulo}
            description={item.descricao}
            style={styles.card}
            titleStyle={{ color: 'white' }}>
            {item.refeicoes.map((alimento, index) => (
                <List.Item key={index} title={alimento} titleStyle={{ color: 'white' }} />
            ))}
        </List.Accordion>
    );

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FlatList
                    data={planejamento}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                          onRefresh={handleRefresh}
                          refreshing={loading}
                        />
                      }
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
