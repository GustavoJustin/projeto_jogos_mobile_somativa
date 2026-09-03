import React from 'react';

import {
    NavigationContainer
} from '@react-navigation/native';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';

import DiarioScreen from './src/screens/DiarioScreen';

import CadastroDiarioScreen
    from './src/screens/CadastroDiarioScreen';

import ListaScreen
    from './src/screens/ListaScreen';

import AdicionarJogoScreen
    from './src/screens/AdicionarJogoScreen';

import ColecaoScreen
    from './src/screens/ColecaoScreen';


const Stack = createNativeStackNavigator();


export default function App() {

    return (

        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#6C5CE7'
                    },

                    headerTintColor: '#FFFFFF',

                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            >

                {/* TELA PRINCIPAL */}

                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Diário Gamer'
                    }}
                />


                {/* LISTA DE JOGOS */}

                <Stack.Screen
                    name="Lista"
                    component={ListaScreen}
                    options={{
                        title: 'Lista de Jogos'
                    }}
                />


                {/* ADICIONAR JOGO */}

                <Stack.Screen
                    name="AdicionarJogo"
                    component={AdicionarJogoScreen}
                    options={{
                        title: 'Adicionar Jogo'
                    }}
                />


                {/* COLEÇÃO */}

                <Stack.Screen
                    name="Colecao"
                    component={ColecaoScreen}
                    options={{
                        title: 'Minha Coleção'
                    }}
                />


                {/* DIÁRIO */}

                <Stack.Screen
                    name="Diario"
                    component={DiarioScreen}
                    options={{
                        title: 'Diário de Jogos'
                    }}
                />


                {/* CADASTRO DO DIÁRIO */}

                <Stack.Screen
                    name="CadastroDiario"
                    component={CadastroDiarioScreen}
                    options={{
                        title: 'Registro'
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}