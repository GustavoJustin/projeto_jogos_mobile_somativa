import { useEffect, useState } from "react"
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

import ListaItem from "../components/lista_component/ListaItem"
import ElementoItem from "../components/lista_component/ElementoItem"

const CHAVE_STORAGE = "@projeto_mobile_somativa:listas"

export default function ListaScreen() {
    // Listas: [{ id, nome, itens: [{ id, texto, nota }] }]
    const [listas, setListas] = useState([])
    const [carregando, setCarregando] = useState(true)

    // Form para criar nova lista
    const [nomeNovaLista, setNomeNovaLista] = useState("")

    // Lista atualmente aberta
    const [listaSelecionadaId, setListaSelecionadaId] = useState(null)

    // Form para adicionar elemento dentro da lista aberta
    const [textoNovoItem, setTextoNovoItem] = useState("")
    const [notaNovoItem, setNotaNovoItem] = useState("")

    // Modal: editar nome da lista
    const [modalListaVisivel, setModalListaVisivel] = useState(false)
    const [listaEmEdicao, setListaEmEdicao] = useState(null)
    const [nomeEdicaoLista, setNomeEdicaoLista] = useState("")

    // Modal: editar elemento (texto + nota)
    const [modalItemVisivel, setModalItemVisivel] = useState(false)
    const [itemEmEdicao, setItemEmEdicao] = useState(null)
    const [textoEdicaoItem, setTextoEdicaoItem] = useState("")
    const [notaEdicaoItem, setNotaEdicaoItem] = useState("")

    // Carregar listas salvas
    useEffect(() => {
        async function carregarListas() {
            try {
                const listasSalvas = await AsyncStorage.getItem(CHAVE_STORAGE)
                if (listasSalvas !== null) {
                    const dados = JSON.parse(listasSalvas)
                    // Normaliza dados antigos/incompletos para não quebrar a tela
                    const normalizadas = dados.map((lista) => ({
                        id: lista.id ?? Date.now().toString(),
                        nome: lista.nome ?? lista.listaTexto ?? "Lista sem nome",
                        itens: Array.isArray(lista.itens) ? lista.itens : [],
                    }))
                    setListas(normalizadas)
                }
            } catch (erro) {
                console.error("Erro ao carregar suas listas do storage:", erro)
            } finally {
                setCarregando(false)
            }
        }
        carregarListas()
    }, [])

    // Salvar sempre que "listas" mudar
    useEffect(() => {
        if (carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(listas)).catch((erro) => {
            console.error("Erro ao salvar listas no storage:", erro)
        })
    }, [listas, carregando])

    const listaSelecionada = listas.find((lista) => lista.id === listaSelecionadaId) ?? null

    // ---------- Listas ----------

    function adicionarLista() {
        const nomeFormatado = nomeNovaLista.trim()
        if (nomeFormatado === "") return

        const novaLista = {
            id: Date.now().toString(),
            nome: nomeFormatado,
            itens: [],
        }

        setListas((listasAtuais) => [...listasAtuais, novaLista])
        setNomeNovaLista("")
    }

    function excluirTodasListas() {
        setListas([])
        setListaSelecionadaId(null)
    }

    function excluirLista(id) {
        setListas((listasAtuais) => listasAtuais.filter((lista) => lista.id !== id))
        if (listaSelecionadaId === id) setListaSelecionadaId(null)
    }

    function abrirLista(id) {
        setListaSelecionadaId(id)
    }

    function voltarParaListas() {
        setListaSelecionadaId(null)
        setTextoNovoItem("")
        setNotaNovoItem("")
    }

    function abrirModalEditarLista(lista) {
        setListaEmEdicao(lista)
        setNomeEdicaoLista(lista.nome)
        setModalListaVisivel(true)
    }

    function fecharModalLista() {
        setModalListaVisivel(false)
        setListaEmEdicao(null)
        setNomeEdicaoLista("")
    }

    function confirmarEdicaoLista() {
        const nomeFormatado = nomeEdicaoLista.trim()
        if (nomeFormatado === "" || !listaEmEdicao) return

        setListas((listasAtuais) =>
            listasAtuais.map((lista) =>
                lista.id === listaEmEdicao.id ? { ...lista, nome: nomeFormatado } : lista
            )
        )
        fecharModalLista()
    }

    // ---------- Elementos da lista aberta ----------

    function adicionarItem() {
        const textoFormatado = textoNovoItem.trim()
        if (textoFormatado === "" || !listaSelecionadaId) return

        let notaFormatada = null
        if (notaNovoItem.trim() !== "") {
            const numero = Number(notaNovoItem)
            if (isNaN(numero)) return
            notaFormatada = numero
        }

        const novoItem = {
            id: Date.now().toString(),
            texto: textoFormatado,
            nota: notaFormatada,
        }

        setListas((listasAtuais) =>
            listasAtuais.map((lista) =>
                lista.id === listaSelecionadaId
                    ? { ...lista, itens: [...lista.itens, novoItem] }
                    : lista
            )
        )

        setTextoNovoItem("")
        setNotaNovoItem("")
    }

    function excluirTodosItens() {
        if (!listaSelecionadaId) return
        setListas((listasAtuais) =>
            listasAtuais.map((lista) =>
                lista.id === listaSelecionadaId ? { ...lista, itens: [] } : lista
            )
        )
    }

    function excluirItem(itemId) {
        if (!listaSelecionadaId) return
        setListas((listasAtuais) =>
            listasAtuais.map((lista) =>
                lista.id === listaSelecionadaId
                    ? { ...lista, itens: lista.itens.filter((item) => item.id !== itemId) }
                    : lista
            )
        )
    }

    function abrirModalEditarItem(item) {
        setItemEmEdicao(item)
        setTextoEdicaoItem(item.texto)
        setNotaEdicaoItem(item.nota === null || item.nota === undefined ? "" : String(item.nota))
        setModalItemVisivel(true)
    }

    function fecharModalItem() {
        setModalItemVisivel(false)
        setItemEmEdicao(null)
        setTextoEdicaoItem("")
        setNotaEdicaoItem("")
    }

    function confirmarEdicaoItem() {
        const textoFormatado = textoEdicaoItem.trim()
        if (textoFormatado === "" || !itemEmEdicao) return

        let notaFormatada = null
        if (notaEdicaoItem.trim() !== "") {
            const numero = Number(notaEdicaoItem)
            if (isNaN(numero)) return
            notaFormatada = numero
        }

        setListas((listasAtuais) =>
            listasAtuais.map((lista) =>
                lista.id === listaSelecionadaId
                    ? {
                          ...lista,
                          itens: lista.itens.map((item) =>
                              item.id === itemEmEdicao.id
                                  ? { ...item, texto: textoFormatado, nota: notaFormatada }
                                  : item
                          ),
                      }
                    : lista
            )
        )

        fecharModalItem()
    }

    // ---------- Render ----------

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Modal: editar nome da lista */}
            <Modal
                visible={modalListaVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={fecharModalLista}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>Editar Lista</Text>

                        <TextInput
                            style={styles.inputModal}
                            value={nomeEdicaoLista}
                            onChangeText={setNomeEdicaoLista}
                            placeholder="Novo nome da lista..."
                            autoFocus
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity style={[styles.botaoModal, styles.botaoCancelar]} onPress={fecharModalLista}>
                                <Text style={styles.textoBotaoModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.botaoModal, styles.botaoSalvar]} onPress={confirmarEdicaoLista}>
                                <Text style={styles.textoBotaoModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal: editar elemento (texto + nota) */}
            <Modal
                visible={modalItemVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={fecharModalItem}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>Editar Elemento</Text>

                        <TextInput
                            style={styles.inputModal}
                            value={textoEdicaoItem}
                            onChangeText={setTextoEdicaoItem}
                            placeholder="Nome do elemento..."
                            autoFocus
                        />

                        <TextInput
                            style={styles.inputModal}
                            value={notaEdicaoItem}
                            onChangeText={setNotaEdicaoItem}
                            placeholder="Nota (opcional)"
                            keyboardType="numeric"
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity style={[styles.botaoModal, styles.botaoCancelar]} onPress={fecharModalItem}>
                                <Text style={styles.textoBotaoModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.botaoModal, styles.botaoSalvar]} onPress={confirmarEdicaoItem}>
                                <Text style={styles.textoBotaoModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {listaSelecionada === null ? (
                <>
                    {/* ---------- Tela de Listas ---------- */}
                    <Text style={styles.titulo}>Minhas Listas</Text>

                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome da nova lista (ex: Jogos)"
                            value={nomeNovaLista}
                            onChangeText={setNomeNovaLista}
                            onSubmitEditing={adicionarLista}
                            returnKeyType="done"
                        />
                        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarLista}>
                            <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoExcluirTudo} onPress={excluirTodasListas}>
                            <Text style={styles.textoBotaoExcluirTudo}>Limpar</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={listas}
                        keyExtractor={(lista) => lista.id}
                        renderItem={({ item }) => (
                            <ListaItem
                                lista={item}
                                aoAbrir={abrirLista}
                                aoEditar={abrirModalEditarLista}
                                aoExcluir={excluirLista}
                            />
                        )}
                        ListEmptyComponent={
                            <Text style={styles.listaVazia}>Nenhuma lista cadastrada ainda</Text>
                        }
                        contentContainerStyle={styles.listaConteudo}
                    />
                </>
            ) : (
                <>
                    {/* ---------- Tela de Elementos da lista aberta ---------- */}
                    <TouchableOpacity style={styles.botaoVoltar} onPress={voltarParaListas}>
                        <Text style={styles.textoBotaoVoltar}>{"< Voltar"}</Text>
                    </TouchableOpacity>

                    <Text style={styles.titulo}>{listaSelecionada.nome}</Text>

                    <View style={styles.formulario}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do elemento"
                            value={textoNovoItem}
                            onChangeText={setTextoNovoItem}
                            returnKeyType="next"
                        />
                        <TextInput
                            style={styles.inputNota}
                            placeholder="Nota"
                            value={notaNovoItem}
                            onChangeText={setNotaNovoItem}
                            onSubmitEditing={adicionarItem}
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                    </View>

                    <View style={styles.formulario}>
                        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarItem}>
                            <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botaoExcluirTudo} onPress={excluirTodosItens}>
                            <Text style={styles.textoBotaoExcluirTudo}>Limpar</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={listaSelecionada.itens}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ElementoItem item={item} aoExcluir={excluirItem} aoEditar={abrirModalEditarItem} />
                        )}
                        ListEmptyComponent={
                            <Text style={styles.listaVazia}>Nenhum elemento cadastrado ainda</Text>
                        }
                        contentContainerStyle={styles.listaConteudo}
                    />
                </>
            )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    formulario: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
    },
    inputNota: {
        width: 80,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    botaoAdicionar: {
        backgroundColor: "#2e86de",
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        marginRight: 8,
        paddingVertical: 10,
    },
    textoBotaoAdicionar: {
        color: "#fff",
        fontWeight: "bold",
    },
    botaoExcluirTudo: {
        backgroundColor: "#e74c3c",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: "center",
    },
    textoBotaoExcluirTudo: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    botaoVoltar: {
        alignSelf: "flex-start",
        marginBottom: 8,
    },
    textoBotaoVoltar: {
        color: "#2e86de",
        fontWeight: "bold",
        fontSize: 15,
    },
    listaConteudo: {
        paddingBottom: 20,
    },
    listaVazia: {
        textAlign: "center",
        color: "#888",
        marginTop: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    inputModal: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    modalBotoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 4,
    },
    botaoModal: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 6,
        marginLeft: 8,
    },
    botaoCancelar: {
        backgroundColor: "#888",
    },
    botaoSalvar: {
        backgroundColor: "#2e86de",
    },
    textoBotaoModal: {
        color: "#fff",
        fontWeight: "bold",
    },
})