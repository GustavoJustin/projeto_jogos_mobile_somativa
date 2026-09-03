import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ElementoItem({ item, aoExcluir, aoEditar }) {
    const temNota = item.nota !== null && item.nota !== undefined

    return (
        <View style={styles.item}>
            <View style={styles.textoContainer}>
                <Text style={styles.texto}>{item.texto}</Text>
                {temNota && <Text style={styles.nota}>Nota: {item.nota}</Text>}
            </View>

            <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => aoEditar(item)}>
                    <Text style={styles.textoBotaoEditar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoExcluir} onPress={() => aoExcluir(item.id)}>
                    <Text style={styles.textoBotaoExcluir}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 10,
        shadowColor: "#000",
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
        color: "#222",
    },
    nota: {
        fontSize: 13,
        color: "#888",
        marginTop: 2,
    },
    botoesContainer: {
        flexDirection: "row",
    },
    botaoEditar: {
        backgroundColor: "#c8891d",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    textoBotaoEditar: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    botaoExcluir: {
        backgroundColor: "#e74c3c",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginLeft: 8,
    },
    textoBotaoExcluir: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
})