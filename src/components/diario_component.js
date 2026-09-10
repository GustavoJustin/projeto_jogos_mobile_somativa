import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DiarioComponent({ registro, onExcluir }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.jogo}>🎮 {registro.jogo}</Text>
        <Text style={styles.nota}>⭐ {registro.nota}/10</Text>
      </View>

      <Text style={styles.data}>📅 {registro.data}</Text>

      <View style={styles.secao}>
        <Text style={styles.tituloSecao}>📝 Descrição</Text>
        <Text style={styles.texto}>{registro.descricao}</Text>
      </View>

      {registro.comentario ? (
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>💬 Comentário</Text>
          <Text style={styles.texto}>{registro.comentario}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.btnExcluir} onPress={() => onExcluir(registro.id)}>
        <Text style={styles.txtExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1e1e2e', padding: 15, borderRadius: 10, marginBottom: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jogo: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  nota: { color: '#f1c40f', fontSize: 16, fontWeight: 'bold' },
  data: { color: '#888', fontSize: 12, marginVertical: 4 },
  secao: { marginTop: 8 },
  tituloSecao: { color: '#a6adc8', fontSize: 14, fontWeight: 'bold' },
  texto: { color: '#cdd6f4', fontSize: 14, marginTop: 2 },
  btnExcluir: { marginTop: 10, alignSelf: 'flex-end' },
  txtExcluir: { color: '#f38ba8', fontWeight: 'bold' }
});