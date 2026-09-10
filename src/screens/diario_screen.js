import React, {
    useCallback,
    useState
} from 'react';

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    useFocusEffect
} from '@react-navigation/native';


import {
    buscarRegistros,
    excluirRegistro
} from '../services/diarioStorage';


export default function DiarioScreen({
    navigation
}) {

    const [registros, setRegistros] =
        useState([]);


    async function carregarRegistros() {

        const dados =
            await buscarRegistros();

        setRegistros(dados);
    }


    useFocusEffect(
        useCallback(() => {

            carregarRegistros();

        }, [])
    );


    function editarRegistro(registro) {

        navigation.navigate(
            'CadastroDiario',
            {
                registro: registro
            }
        );
    }


    function confirmarExclusao(id) {

        Alert.alert(
            'Excluir registro',

            'Tem certeza que deseja excluir este registro?',

            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },

                {
                    text: 'Excluir',
                    style: 'destructive',

                    onPress: async () => {

                        const registrosAtualizados =
                            await excluirRegistro(id);

                        setRegistros(
                            registrosAtualizados
                        );
                    }
                }
            ]
        );
    }


    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                📖 Diário de Jogos
            </Text>

            <Text style={styles.subtitulo}>
                Registre suas experiências com jogos
            </Text>

            <TouchableOpacity
                style={styles.botaoNovo}
                onPress={() =>
                    navigation.navigate(
                        'CadastroDiario'
                    )
                }
            >

                <Text style={styles.textoBotao}>
                    + Novo Registro
                </Text>

            </TouchableOpacity>

            <FlatList
                data={registros}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={
                    registros.length === 0
                        ? styles.listaVazia
                        : styles.lista
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>

                        <View style={styles.cardCabecalho}>
                            <Text style={styles.cardTitulo}>
                                {item.jogo}
                            </Text>
                            <Text style={styles.cardNota}>
                                ⭐ {item.nota}
                            </Text>
                        </View>

                        <Text style={styles.cardData}>
                            📅 {item.data}
                        </Text>

                        <Text style={styles.cardOpiniao} numberOfLines={3}>
                            {item.opiniao}
                        </Text>

                        <View style={styles.cardBotoes}>
                            <TouchableOpacity
                                style={styles.botaoEditar}
                                onPress={() => editarRegistro(item)}
                            >
                                <Text style={styles.textoBotaoPequeno}>
                                    Editar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botaoExcluir}
                                onPress={() => confirmarExclusao(item.id)}
                            >
                                <Text style={styles.textoBotaoPequeno}>
                                    Excluir
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>
                        Nenhum registro cadastrado ainda
                    </Text>
                }
            />

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        padding: 20,
        paddingTop: 30
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    subtitulo: {
        fontSize: 15,
        textAlign: 'center',
        color: '#666666',
        marginTop: 5,
        marginBottom: 20
    },

    botaoNovo: {
        backgroundColor: '#6C5CE7',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },

    textoBotao: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },

    lista: {
        paddingBottom: 20
    },

    listaVazia: {
        flexGrow: 1,
        justifyContent: 'center'
    },

    vazio: {
        textAlign: 'center',
        fontSize: 17,
        color: '#777777'
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4
    },

    cardCabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },

    cardTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1,
        marginRight: 8
    },

    cardNota: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6C5CE7'
    },

    cardData: {
        fontSize: 13,
        color: '#888888',
        marginBottom: 8
    },

    cardOpiniao: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 19,
        marginBottom: 12
    },

    cardBotoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    botaoEditar: {
        backgroundColor: '#6C5CE7',
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 8
    },

    botaoExcluir: {
        backgroundColor: '#e74c3c',
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 8,
        marginLeft: 8
    },

    textoBotaoPequeno: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 13
    }

});