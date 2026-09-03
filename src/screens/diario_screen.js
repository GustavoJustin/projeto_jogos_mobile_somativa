import React, {
    useCallback,
    useState
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    useFocusEffect
} from '@react-navigation/native';

import RegistroCard from '../components/RegistroCard';

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
            'cadastro_diario_screen',
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

        {/* restante da FlatList */}

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
    }

});