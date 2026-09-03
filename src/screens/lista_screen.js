import { useState } from "react"
import { StyleSheet } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage";
const CHAVE_STORAGE = "@projeto_mobile_somativa:listas" 

export default function listaScreen() {
    //Lista geral
    const [listas, setListas] = useState([])
    const [textoListaInput, setTextoListaInput] = useState("")

    //Lista filme dentro da lista geral
    const [filmes, setFilmes] = useState ([])
    const [textoFilmeInput, setTextoFilmeInput] = useState("")
    const [notaFilmeInput, setNotaFilmeInput] = useState()

    //Lista jogo dentro da lista geral
    const [jogos, setJogos] = useState([])
    const [textoJogoInput, setTextoJogoInput] = useState("")
    const [notaJogoInput, setNotaJogoInput] = useState("")

    //carregamento
    const [carregando, setCarregando] = useState(true)

    //buscar listas
    useEffect(() => {
        async function carregarListas() {
            try {
                const listasSalvas = await AsyncStorage.getItem(CHAVE_STORAGE)

                if(listasSalvas !== null) {
                setListas(JSON.parse(listasSalvas))
                }
            } catch(erro) {
                console.error("Erro ao carregar suas listas do storage:", erro)
            } finally {
                setCarregando(false)
            }
        }

        if (carregarFilmes !== null) {
            async function carregarFilmes() {
                try {
                    const filmesSalvos = await AsyncStorage.getItem(CHAVE_STORAGE)

                    if(filmesSalvos !== null) {
                    setListas(JSON.parse(filmesSalvos))
                    }
                } catch(erro) {
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

                    if(jogosSalvos !== null) {
                    setListas(JSON.parse(jogosSalvos))
                    }
                } catch(erro) {
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
        if(carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(listas)).catch((erro) => {console.error("Erro ao salvar lista no storage: ", erro)})

    }, [listas, carregando]) //toda vez (listas)


    //filmes
    useEffect(() => {
        if(carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(filmes)).catch((erro) => {console.error("Erro ao salvar filme no storage: ", erro)})

    }, [filmes, carregando]) //toda vez (filmes)


    //jogos
    useEffect(() => {
        if(carregando) return

        AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(jogos)).catch((erro) => {console.error("Erro ao salvar jogo no storage: ", erro)})

    }, [jogos, carregando]) //toda vez (jogos)


    //adicionar
    function adicionarLista() {
        const listaTexto = textoListaInput.trim()

        if(listaTexto === "") return

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

        if(filmeTexto === "") return
        if(filmeNota === 0) return

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

        if(jogoTexto === "") return
        if(jogoNota === 0) return

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

    //Sistema de edicao

    //base html com os botoes chamando as funcoes
};

const style = StyleSheet.create({

});