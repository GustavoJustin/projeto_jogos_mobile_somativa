import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { diarioStorage } from '../services/diario_storage';

export default function CadastroDiarioScreen({ navigation }) {
  const [jogo, setJogo] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState('');

  async function handleSalvar() {
    if (!jogo || !data || !descricao || !nota) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios (Jogo, Data, Descrição e Nota).');
      return;
    }

    await diarioStorage.salvar({ jogo, data, descricao, comentario, nota });
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Jogo *</Text>
      <TextInput style={styles.input} value={jogo} onChangeText={setJogo} placeholder="Ex: Zelda TOTK" placeholderTextColor="#666" />

      <Text style={styles.label}>Data de Uso *</Text>
      <TextInput style={styles.input} value={data} onChangeText={setData} placeholder="Ex: DD/MM/AAAA" placeholderTextColor="#666" />

      <Text style={styles.label}>Nota (0 a 10) *</Text>
      <TextInput style={styles.input} value={nota} onChangeText={setNota} keyboardType="numeric" placeholder="Ex: 9" placeholderTextColor="#666" />

      <Text style={styles.label}>Descrição *</Text>
      <TextInput style={[styles.input, styles.multiline]} value={descricao} onChangeText={setDescricao} multiline placeholder="O que você jogou/conquistou?" placeholderTextColor="#666" />

      <Text style={styles.label}>Comentário</Text>
      <TextInput style={[styles.input, styles.multiline]} value={comentario} onChangeText={setComentario} multiline placeholder="Impressões gerais..." placeholderTextColor="#666" />

      <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
        <Text style={styles.txtSalvar}>Salvar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11111b', padding: 20 },
  label: { color: '#cdd6f4', fontSize: 14, marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#1e1e2e', color: '#fff', padding: 12, borderRadius: 8 },
  multiline: { height: 80, textAlignVertical: 'top' },
  btnSalvar: { backgroundColor: '#a6e3a1', padding: 15, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  txtSalvar: { color: '#11111b', fontWeight: 'bold', fontSize: 16 }
});