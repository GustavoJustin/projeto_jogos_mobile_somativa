import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_REGISTROS = '@diario_gamer:registros';

export async function buscarRegistros() {
    try {
        const dados = await AsyncStorage.getItem(
            CHAVE_REGISTROS
        );

        if (dados) {
            return JSON.parse(dados);
        }

        return [];

    } catch (erro) {

        console.log(
            'Erro ao buscar registros:',
            erro
        );

        return [];
    }
}


export async function salvarRegistros(registros) {
    try {

        await AsyncStorage.setItem(
            CHAVE_REGISTROS,
            JSON.stringify(registros)
        );

    } catch (erro) {

        console.log(
            'Erro ao salvar registros:',
            erro
        );
    }
}


export async function adicionarRegistro(registro) {

    const registros =
        await buscarRegistros();

    const novosRegistros = [
        ...registros,
        registro
    ];

    await salvarRegistros(
        novosRegistros
    );

    return novosRegistros;
}


export async function atualizarRegistro(
    registroAtualizado
) {

    const registros =
        await buscarRegistros();

    const novosRegistros = registros.map(
        (registro) => {

            if (
                registro.id ===
                registroAtualizado.id
            ) {
                return registroAtualizado;
            }

            return registro;
        }
    );

    await salvarRegistros(
        novosRegistros
    );

    return novosRegistros;
}


export async function excluirRegistro(id) {

    const registros =
        await buscarRegistros();

    const novosRegistros =
        registros.filter(
            (registro) =>
                registro.id !== id
        );

    await salvarRegistros(
        novosRegistros
    );

    return novosRegistros;
}