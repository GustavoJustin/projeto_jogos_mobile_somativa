import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ListaItem({ lista, aoExcluirL, aoEditarL }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluirL(lista.id)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoEditar}
        onPress={() => aoEditarL(lista)}
      >
        <Text style={styles.textoBotaoEditar}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    // Sombra leve só para destacar o card (funciona em iOS e Android)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  textoContainer: {
    flex: 1,
    marginRight: 10,
  },
  texto: {
    fontSize: 16,
    color: '#222',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  botaoExcluir: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  //atividade
  botaoEditar: {
    backgroundColor: '#c8891d',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoEditar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
