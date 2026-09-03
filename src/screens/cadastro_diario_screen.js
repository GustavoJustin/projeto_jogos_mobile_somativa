import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';

import {
    adicionarRegistro,
    atualizarRegistro
} from '../services/diarioStorage';


export default function CadastroDiarioScreen({
    navigation,
    route
}) {

    // Verifica se existe um registro sendo editado
    const registroEditado = route.params?.registro;

    const [jogo, setJogo] = useState(
        registroEditado?.jogo || ''
    );

    const [data, setData] = useState(
        registroEditado?.data || ''
    );

    const [descricao, setDescricao] = useState(
        registroEditado?.descricao || ''
    );

    const [opiniao, setOpiniao] = useState(
        registroEditado?.opiniao || ''
    );

    const [nota, setNota] = useState(
        registroEditado?.nota?.toString() || ''
    );


    async function salvar() {

        // Verifica se todos os campos foram preenchidos
        if (
            !jogo.trim() ||
            !data.trim() ||
            !descricao.trim() ||
            !opiniao.trim() ||
            !nota.trim()
        ) {

            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            );

            return;
        }


        // Converte a nota para número
        const notaNumerica = Number(
            nota.replace(',', '.')
        );


        // Verifica se a nota está entre 0 e 5
        if (
            isNaN(notaNumerica) ||
            notaNumerica < 0 ||
            notaNumerica > 5
        ) {

            Alert.alert(
                'Nota inválida',
                'Digite uma nota entre 0 e 5.'
            );

            return;
        }


        // Cria o objeto do registro
        const registro = {

            id: registroEditado
                ? registroEditado.id
                : Date.now(),

            jogo: jogo.trim(),

            data: data.trim(),

            descricao: descricao.trim(),

            opiniao: opiniao.trim(),

            nota: notaNumerica

        };


        try {

            // Se existe um registro sendo editado,
            // atualiza o registro
            if (registroEditado) {

                await atualizarRegistro(
                    registro
                );

                Alert.alert(
                    'Sucesso',
                    'Registro atualizado com sucesso!'
                );

            } else {

                // Caso contrário, cria um novo registro
                await adicionarRegistro(
                    registro
                );

                Alert.alert(
                    'Sucesso',
                    'Registro adicionado com sucesso!'
                );
            }


            // Volta para a tela do Diário
            navigation.goBack();

        } catch (erro) {

            console.log(
                'Erro ao salvar registro:',
                erro
            );

            Alert.alert(
                'Erro',
                'Não foi possível salvar o registro.'
            );
        }
    }


    return (

        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
        >

            <Text style={styles.titulo}>
                {registroEditado
                    ? '✏️ Editar Registro'
                    : '📖 Novo Registro'}
            </Text>


            <Text style={styles.label}>
                🎮 Nome do jogo
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o nome do jogo"
                value={jogo}
                onChangeText={setJogo}
            />


            <Text style={styles.label}>
                📅 Data
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Ex: 27/08/2026"
                value={data}
                onChangeText={setData}
            />


            <Text style={styles.label}>
                📝 Breve descrição do jogo
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.textArea
                ]}
                placeholder="Conte brevemente sobre o jogo"
                value={descricao}
                onChangeText={setDescricao}
                multiline
                numberOfLines={4}
            />


            <Text style={styles.label}>
                💭 Minha experiência
            </Text>

            <TextInput
                style={[
                    styles.input,
                    styles.textArea
                ]}
                placeholder="Conte sua opinião e experiência com o jogo"
                value={opiniao}
                onChangeText={setOpiniao}
                multiline
                numberOfLines={5}
            />


            <Text style={styles.label}>
                ⭐ Nota
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Digite uma nota de 0 a 5"
                value={nota}
                onChangeText={setNota}
                keyboardType="decimal-pad"
            />


            <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={salvar}
            >

                <Text style={styles.textoBotao}>
                    {registroEditado
                        ? 'Salvar Alterações'
                        : 'Salvar Registro'}
                </Text>

            </TouchableOpacity>


            <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() =>
                    navigation.goBack()
                }
            >

                <Text style={styles.textoCancelar}>
                    Cancelar
                </Text>

            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },

    conteudo: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 40
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 7,
        color: '#333333'
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        padding: 13,
        fontSize: 16,
        marginBottom: 20
    },

    textArea: {
        height: 110,
        textAlignVertical: 'top'
    },

    botaoSalvar: {
        backgroundColor: '#6C5CE7',
        padding: 15,
        borderRadius: 10,
        marginTop: 5
    },

    textoBotao: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },

    botaoCancelar: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#999999'
    },

    textoCancelar: {
        color: '#555555',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }

});