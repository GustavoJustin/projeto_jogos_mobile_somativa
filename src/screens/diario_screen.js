import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { diarioStorage } from '../services/diario_storage';
import DiarioComponent from '../components/diario_component';

export default function DiarioScreen({ navigation }) {
  const [registros, setRegistros] = useState([]);

  // Recarrega os registros sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarRegistros();
    }, [])
  );

  async function carregarRegistros() {
    const dados = await diarioStorage.buscarTodos();
    setRegistros(dados);
  }

  async function handleExcluir(id) {
    const atualizados = await diarioStorage.excluir(id);
    setRegistros(atualizados);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DiarioComponent 
            registro={item} 
            onExcluir={handleExcluir} 
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum registro no diário ainda.</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity 
        style={styles.btnAdicionar} 
        onPress={() => navigation.navigate('CadastroDiarioScreen')}
      >
        <Text style={styles.txtAdicionar}>+ Novo Registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11111b',
    padding: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyText: {
    color: '#a6adc8',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  btnAdicionar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#89b4fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  txtAdicionar: {
    color: '#11111b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});