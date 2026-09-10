import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home_screen';
import ListaScreen from './src/screens/lista_screen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Lista" component={ListaScreen} />  
            </Stack.Navigator>
        </NavigationContainer>
    )
}