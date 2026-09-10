import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home_screen';
import ListaScreen from './src/screens/lista_screen';
// import DiarioScreen from './src/screens/diario_screen';
// import CadastroDiarioScreen from './src/screens/cadastro_diario_screen'

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Lista" component={ListaScreen} />
                {/* <Stack.Screen name="Diario" component={DiarioScreen} />
                <Stack.Screen name="CadastroDiario" component={CadastroDiarioScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}