import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function diario_screen({
    registro,
    onEditar,
    onExcluir
}) {

    return (
        <View style={styles.card}>

            <Text style={styles.jogo}>
                🎮 {registro.jogo}
            </Text>

            <Text style={styles.data}>
                📅 {registro.data}
            </Text>

            <View style={styles.secao}>

                <Text style={styles.tituloSecao}>
                    📝 Descrição
                </Text>

                <Text style={styles.texto}>
                    {registro.descricao}
                </Text>

            </View>

            <View style={styles.secao}>

                <Text style={styles.tituloSecao}>
                    💭 Minha experiencia 
                </Text>

                <Text style={styles.texto}>
                    {registro.experiencia}
                </Text>

            </View>

            <View style={styles.notaContainer}>

                <Text style={styles.nota}>
                    ⭐ Nota: {registro.nota}/5
                </Text>

            </View>

            <View style={styles.botoes}>

                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => onEditar(registro)}
                >
                    <Text style={styles.textoBotao}>
                        ✏️ Editar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => onExcluir(registro.id)}
                >
                    <Text style={styles.textoBotao}>
                        🗑️ Excluir
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,

        elevation: 4,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4
    },

    jogo: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 6
    },

    data: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 15
    },

    secao: {
        marginBottom: 12
    },

    tituloSecao: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4
    },

    texto: {
        fontSize: 14,
        color: '#444444',
        lineHeight: 20
    },

    notaContainer: {
        marginTop: 5,
        marginBottom: 15
    },

    nota: {
        fontSize: 17,
        fontWeight: 'bold'
    },

    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    botaoEditar: {
        backgroundColor: '#6C5CE7',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5
    },

    botaoExcluir: {
        backgroundColor: '#E74C3C',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5
    },

    textoBotao: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
    }

});