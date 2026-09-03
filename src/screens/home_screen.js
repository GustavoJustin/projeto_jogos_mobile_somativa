import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default function HomeScreen({
    navigation
}) {

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                🎮 Diário Gamer
            </Text>

            <Text style={styles.subtitulo}>
                Organize seus jogos e registre suas experiências
            </Text>


            {/* LISTA DE JOGOS */}
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Lista')
                }
            >

                <Text style={styles.icone}>
                    🎮
                </Text>

                <View style={styles.textos}>

                    <Text style={styles.tituloCard}>
                        Lista de Jogos
                    </Text>

                    <Text style={styles.descricao}>
                        Veja os jogos cadastrados e adicione
                        novos jogos.
                    </Text>

                </View>

            </TouchableOpacity>


            {/* COLEÇÃO */}
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Colecao')
                }
            >

                <Text style={styles.icone}>
                    🕹️
                </Text>

                <View style={styles.textos}>

                    <Text style={styles.tituloCard}>
                        Minha Coleção
                    </Text>

                    <Text style={styles.descricao}>
                        Gerencie os jogos que fazem parte
                        da sua coleção.
                    </Text>

                </View>

            </TouchableOpacity>


            {/* DIÁRIO */}
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('Diario')
                }
            >

                <Text style={styles.icone}>
                    📖
                </Text>

                <View style={styles.textos}>

                    <Text style={styles.tituloCard}>
                        Diário de Jogos
                    </Text>

                    <Text style={styles.descricao}>
                        Registre sua experiência e sua opinião
                        sobre os jogos.
                    </Text>

                </View>

            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        padding: 20,
        paddingTop: 60
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },

    subtitulo: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 35
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 18,

        flexDirection: 'row',
        alignItems: 'center',

        elevation: 4,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4
    },

    icone: {
        fontSize: 42,
        marginRight: 18
    },

    textos: {
        flex: 1
    },

    tituloCard: {
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 5
    },

    descricao: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20
    }

});