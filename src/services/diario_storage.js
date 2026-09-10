import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@diario_jogos';

export const diarioStorage = {
  async buscarTodos() {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (e) {
      console.error('Erro ao buscar diários', e);
      return [];
    }
  },

  async salvar(novoRegistro) {
    try {
      const registros = await this.buscarTodos();
      const atualizados = [...registros, { ...novoRegistro, id: Date.now().toString() }];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados));
      return atualizados;
    } catch (e) {
      console.error('Erro ao salvar diário', e);
    }
  },

  async excluir(id) {
    try {
      const registros = await this.buscarTodos();
      const filtrados = registros.filter(item => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtrados));
      return filtrados;
    } catch (e) {
      console.error('Erro ao excluir diário', e);
    }
  }
};