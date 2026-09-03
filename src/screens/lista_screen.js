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

import AsyncStorage from "@react-native-async-storage/async-storage";
const CHAVE_STORAGE = "@projeto_mobile_somativa:listas"

import ListaItem from "../components/lista_component/ListaItem"
import FilmesItem from "../components/lista_component/FilmesItem"
import JogosItem from "../components/lista_component/JogosItem"

export default function listaScreen() {
    //Lista geral
    const [listas, setListas] = useState([])
    const [textoListaInput, setTextoListaInput] = useState("")

    //Lista filme dentro da lista geral
    const [filmes, setFilmes] = useState([])
    const [textoFilmeInput, setTextoFilmeInput] = useState("")
    const [notaFilmeInput, setNotaFilmeInput] = useState()

    //Lista jogo dentro da lista geral
    const [jogos, setJogos] = useState([])
    const [textoJogoInput, setTextoJogoInput] = useState("")
    const [notaJogoInput, setNotaJogoInput] = useState("")

    //carregamento
    const [carregando, setCarregando] = useState(true)

    //Modal
    const [modalVisivel, setModalVisivel] = useState(false);

    const [listasEmEdicao, setListasEmEdicao] = useState(null);
    const [filmesEmEdicao, setFilmesEmEdicao] = useState(null);
    const [jogosEmEdicao, setJogosEmEdicao] = useState(null);

    const [textoEdicaoL, setTextoEdicaoL] = useState("");

    const [textoEdicaoF, setTextoEdicaoF] = useState("");
    const [notaEdicaoF, setNotaEdicaoF] = useState(0)

    const [textoEdicaoJ, setTextoEdicaoJ] = useState("");
    const [notaEdicaoJ, setNotaEdicaoJ] = useState(0)

    //buscar listas
    useEffect(() => {
        async function carregarListas() {
            try {
                const listasSalvas = await AsyncStorage.getItem(CHAVE_STORAGE)

                if (listasSalvas !== null) {
                    setListas(JSON.parse(listasSalvas))
                }
            } catch (erro) {
                console.error("Erro ao carregar suas listas do storage:", erro)
            } finally {
                setCarregando(false)
            }
        }

        if (carregarFilmes !== null) {
            async function carregarFilmes() {
                try {
                    const filmesSalvos = await AsyncStorage.getItem(CHAVE_STORAGE)

                    if (filmesSalvos !== null) {
                        setListas(JSON.parse(filmesSalvos))
                    }
                } catch (erro) {
                    console.error("Erro ao carregar sua lista de filmes no storage:", erro)
                } finally {
                    setCarregando(false)
                }
            }
            carregarFilmes()
        } else {
            console.log("Não possui listas de filmes ainda")
        }

        if (carregarJogos !== null) {
            async function carregarJogos() {
                try {
                    const jogosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE)

                    if (jogosSalvos !== null) {
                        setListas(JSON.parse(jogosSalvos))
                    }
                } catch (erro) {
                    console.error("Erro ao carregar seus jogos no storage:", erro)
                } finally {
                    setCarregando(false)
                }
            }
            carregarJogos()
        } else {
            console.log("Não possui listas de jogos ainda")
        }
        carregarListas()

    }, []) //Vai executar uma vez


    //listas
    useEffect(() => {
        if (carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(listas)).catch((erro) => { console.error("Erro ao salvar lista no storage: ", erro) })

    }, [listas, carregando]) //toda vez (listas)


    //filmes
    useEffect(() => {
        if (carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes)).catch((erro) => { console.error("Erro ao salvar filme no storage: ", erro) })

    }, [filmes, carregando]) //toda vez (filmes)


    //jogos
    useEffect(() => {
        if (carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(jogos)).catch((erro) => { console.error("Erro ao salvar jogo no storage: ", erro) })

    }, [jogos, carregando]) //toda vez (jogos)


    //adicionar
    function adicionarLista() {
        const listaTexto = textoListaInput.trim()

        if (listaTexto === "") return

        const novaLista = {
            id: Date.now().toString(),
            listaTexto
        }

        setListas((listasAtuais) => [...listasAtuais, novaLista])

        setTextoListaInput("")
    }

    function adicionarFilme() {
        const filmeTexto = textoFilmeInput.trim()
        const filmeNota = notaFilmeInput.trim()

        if (filmeTexto === "") return
        if (filmeNota === 0) return

        const novoFilme = {
            id: Date.now().toString(),
            filmeTexto,
            filmeNota
        }

        setFilmes((filmesAtuais) => [...filmesAtuais, novoFilme])

        setTextoFilmeInput("")
        setNotaFilmeInput("")
    }

    function adicionarJogo() {
        const jogoTexto = textoJogoInput.trim()
        const jogoNota = notaJogoInput.trim()

        if (jogoTexto === "") return
        if (jogoNota === 0) return

        const novoJogo = {
            id: Date.now().toString(),
            jogoTexto,
            jogoNota
        }

        setJogos((jogosAtuais) => [...jogosAtuais, novoJogo])

        setTextoJogoInput("")
        setNotaJogoInput("")
    }


    //excluir geral
    function excluirTodasListas() {
        setListas([])
    }

    function excluirTodosFilmes() {
        setFilmes([])
    }

    function excluirTodosJogos() {
        setJogos([])
    }


    //excluir unico
    function excluirListas(id) {
        setListas((listasAtuais) => listasAtuais.filter((lista) => lista.id !== id))
    }

    function excluirFilme(id) {
        setFilmes((filmesAtuais) => filmesAtuais.filter((filme) => filme.id !== id))
    }

    function excluirJogos(id) {
        setJogos((jogosAtuais) => jogosAtuais.filter((jogo) => jogo.id !== id))
    }


    //Abrir modal
    function abrirModalEditarL(listas) {
        setListasEmEdicao(listas);
        setTextoEdicaoL(listas.listaTexto);
        setModalVisivel(true);
    }

    function abrirModalEditarF(filmes) {
        setFilmesEmEdicao(filmes);
        setTextoEdicaoF(filmes.filmeTexto);
        setNotaEdicaoF(filmes.notaEdicao)
        setModalVisivel(true);
    }

    function abrirModalEditarJ(jogos) {
        setJogosEmEdicao(jogos);
        setTextoEdicaoJ(jogos.textoEdicao);
        setNotaEdicaoJ(jogos.notaEdicao)
        setModalVisivel(true);
    }


    //Fechar modal
    function fecharModal() {
        setModalVisivel(false);

        setListasEmEdicao(null);
        setFilmesEmEdicao(null);
        setJogosEmEdicao(null);

        setTextoEdicaoL("");

        setTextoEdicaoF("");
        setNotaEdicaoF(0)

        setTextoEdicaoJ("");
        setNotaEdicaoJ(0)
    }


    //Salvar o texto alterado na lista
    function confirmarEdicaoL() {
        const textoFormatadoL = textoEdicaoL.trim();
        if (textoFormatadoL === "" || !listasEmEdicao) return;

        setListas((listasAtuais) =>
            listasAtuais.map((listas) =>
                listas.id === listasEmEdicao.id
                    ? { ...listas, listaTexto: textoFormatadoL }
                    : listas
            )
        );

        fecharModal();
    }

    function confirmarEdicaoF() {
        const textoFormatadoF = textoEdicaoF.trim();
        if (textoFormatadoF === "" || !filmesEmEdicao) return;

        if (notaEdicaoF === 0 || !filmesEmEdicao) return;

        setFilmes((filmesAtuais) =>
            filmesAtuais.map((filmes) =>
                filmes.id === filmesEmEdicao.id
                    ? { ...filmes, filmeTexto: textoFormatadoF }
                    : filmes
            )
        );

        fecharModal();
    }

    function confirmarEdicaoJ() {
        const textoFormatadoJ = textoEdicaoJ.trim();
        if (textoFormatadoJ === "" || !jogosEmEdicao) return;

        if (notaEdicaoJ === 0 || !jogosEmEdicao) return;

        setJogos((jogosAtuais) =>
            jogosAtuais.map((jogos) =>
                jogos.id === jogosEmEdicao.id
                    ? { ...jogos, jogoTexto: textoFormatadoJ }
                    : jogos
            )
        );

        fecharModal();
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* Listas */}
            <Modal
                visible={modalVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>Editar Listas</Text>

                        <TextInput
                            style={styles.inputModal}
                            value={textoEdicaoL}
                            onChangeText={setTextoEdicaoL}
                            placeholder="Novo nome da lista..."
                            autoFocus
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoCancelar]}
                                onPress={fecharModal}
                            >
                                <Text style={styles.textoBotaoModal}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoSalvar]}
                                onPress={confirmarEdicaoL}
                            >
                                <Text style={styles.textoBotaoModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Filmes */}
            < Modal
                visible={modalVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>Editar Filmes</Text>

                        <TextInput
                            style={styles.inputModal}
                            value={textoEdicaoF}
                            onChangeText={setTextoEdicaoF}
                            placeholder="Novo nome do Filme..."
                            autoFocus
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoCancelar]}
                                onPress={fecharModal}
                            >
                                <Text style={styles.textoBotaoModal}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoSalvar]}
                                onPress={confirmarEdicaoF}
                            >
                                <Text style={styles.textoBotaoModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >

            {/* Jogos */}
            < Modal
                visible={modalVisivel}
                transparent={true}
                animationType="fade"
                onRequestClose={fecharModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitulo}>Editar Jogos</Text>

                        <TextInput
                            style={styles.inputModal}
                            value={textoEdicaoJ}
                            onChangeText={setTextoEdicaoJ}
                            placeholder="Novo nome do Jogo..."
                            autoFocus
                        />

                        <View style={styles.modalBotoes}>
                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoCancelar]}
                                onPress={fecharModal}
                            >
                                <Text style={styles.textoBotaoModal}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botaoModal, styles.botaoSalvar]}
                                onPress={confirmarEdicaoJ}
                            >
                                <Text style={styles.textoBotaoModal}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >

            {/* Listas */}
            <Text style={styles.titulo}>Listas</Text>

            <View style={styles.formulario}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma nova lista"
                    value={textoListaInput}
                    onChangeText={setTextoListaInput}
                    onSubmitEditing={adicionarLista}
                    returnType="done"
                />

                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarLista}
                >
                    <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoCancelar}
                    onPress={excluirTodasListas}
                >
                    <Text style={styles.textoBotaoExcluirTudo}>Limpar</Text>
                </TouchableOpacity>
            </View>


            {/* Filmes */}
            <Text style={styles.titulo}>Filmes</Text>

            <View style={styles.formulario}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um novo filme"
                    value={textoFilmeInput}
                    onChangeText={setTextoFilmeInput}
                    onSubmitEditing={adicionarFilme}
                    returnType="done"
                />

                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarFilme}
                >
                    <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoCancelar}
                    onPress={excluirTodosFilmes}
                >
                    <Text style={styles.textoBotaoExcluirTudo}>Limpar</Text>
                </TouchableOpacity>
            </View>


            {/* Jogos */}
            <Text style={styles.titulo}>Jogos</Text>

            <View style={styles.formulario}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um novo jogo"
                    value={textoJogoInput}
                    onChangeText={setTextoJogoInput}
                    onSubmitEditing={adicionarJogo}
                    returnType="done"
                />

                <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarJogo}
                >
                    <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoCancelar}
                    onPress={excluirTodosJogos}
                >
                    <Text style={styles.textoBotaoExcluirTudo}>Limpar</Text>
                </TouchableOpacity>
            </View>


            {/* Listas */}
            <FlatList 
                data={listas}
                keyExtractor={(lista) => lista.id}
                renderItem={({ item }) => (
                    <ListaItem 
                        lista={item}
                        aoExcluirL={excluirListas}
                        aoEditarL={abrirModalEditarL}
                    />
                )}

                ListaEmptyComponent={
                    <Text style={styles.listaVazia}>
                        Nenhuma lista cadastrada ainda
                    </Text>
                }
                contentContainerStyle={styles.listaConteudo}
            />

            
            {/* Filmes */}
            <FlatList 
                data={filmes}
                keyExtractor={(filme) => filme.id}
                renderItem={({ item }) => (
                    <FilmesItem 
                        filme={item}
                        aoExcluirF={excluirFilme}
                        aoEditarF={abrirModalEditarF}
                    />
                )}

                ListaEmptyComponent={
                    <Text style={styles.listaVazia}>
                        Nenhuma lista cadastrada ainda
                    </Text>
                }
                contentContainerStyle={styles.listaConteudo}
            />


            {/* Jogos */}
            <FlatList 
                data={jogos}
                keyExtractor={(jogo) => jogo.id}
                renderItem={({ item }) => (
                    <JogosItem 
                        jogo={item}
                        aoExcluirJ={excluirJogos}
                        aoEditarJ={abrirModalEditarJ}
                    />
                )}

                ListaEmptyComponent={
                    <Text style={styles.listaVazia}>
                        Nenhum filme cadastrado ainda
                    </Text>
                }
                contentContainerStyle={styles.listaConteudo}
            />
        </KeyboardAvoidingView>
    );
};

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
    botaoAdicionar: {
        backgroundColor: "#2e86de",
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
    },
    textoBotaoAdicionar: {
        color: "#fff",
        fontWeight: "bold",
    },
    listaConteudo: {
        paddingBottom: 20,
    },
    listaVazia: {
        textAlign: "center",
        color: "#888",
        marginTop: 24,
    },

    //atividade
    botaoExcluirTudo: {
        backgroundColor: '#e74c3c',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        justifyContent: "center"
    },
    textoBotaoExcluirTudo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },

    // Estilos do Modal
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
        marginBottom: 16,
    },
    modalBotoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
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
});