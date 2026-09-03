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
} from '../services/storage';


export default function HomeScreen({
    navigation
}) {

    const [registros, setRegistros] = useState([]);


    async function carregarRegistros() {

        const dados = await buscarRegistros();

        setRegistros(dados);
    }


    useFocusEffect(
        useCallback(() => {

            carregarRegistros();

        }, [])
    );


    function editarRegistro(registro) {

        navigation.navigate(
            'Cadastro',
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
                🎮 Diário Gamer
            </Text>

            <Text style={styles.subtitulo}>
                Registre suas experiências com jogos
            </Text>


            <TouchableOpacity
                style={styles.botaoNovo}
                onPress={() =>
                    navigation.navigate('Cadastro')
                }
            >

                <Text style={styles.textoBotaoNovo}>
                    + Novo Registro
                </Text>

            </TouchableOpacity>


            <FlatList

                data={registros}

                keyExtractor={(item) =>
                    item.id.toString()
                }

                renderItem={({ item }) => (

                    <RegistroCard
                        registro={item}
                        onEditar={editarRegistro}
                        onExcluir={confirmarExclusao}
                    />

                )}

                ListEmptyComponent={

                    <Text style={styles.vazio}>
                        Nenhum registro encontrado.
                    </Text>

                }

                contentContainerStyle={
                    registros.length === 0
                        ? styles.listaVazia
                        : styles.lista
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
        paddingTop: 50
    },

    titulo: {
        fontSize: 30,
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

    textoBotaoNovo: {
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