/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { List, Text } from 'react-native-paper';
import { createAxios } from '../../utils/axios-helper';

const DietaScreen = () => {
    const [loading, setLoading] = useState(false);
    const [planejamento, setPlanejamento] = useState({});
    const flatListRef = useRef(null);

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

const renderItem = ({ item, index }) => (
    <View style={[styles.cardContainer, index === 0 && { marginTop: 100 }]}>
      <List.Accordion
        key={item.id}
        title={item.descricao}
        style={styles.cardContent}
        titleStyle={styles.descricaoText}
        left={() => <Text style={styles.horaRefeicao}>{item.horaRefeicao}</Text>}
      >
          <View style={styles.exercicioContainer}>
            <Text style={styles.exercicioDescricao}>
              {item?.descricao}
            </Text>
          </View>
      </List.Accordion>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={planejamento?.refeicoes}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={loading} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
    backgroundColor: '#1F222A',
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  descricaoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#181A20',
    paddingVertical: 20,
    marginBottom: 30,
    borderRadius: 25,
  },
  cardContent: {
    backgroundColor: '#181A20',
  },
  exercicioDescricao: {
    color: 'white',
    fontSize: 16,
    marginLeft: 17,
  },
  horaRefeicao: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 9,
    fontSize: 16,
    color: '#F7D100',
  },
});

export default DietaScreen;
