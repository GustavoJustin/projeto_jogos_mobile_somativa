import { StatusBar } from 'expo-status-bar';
import ListaScreen from "./src/screens/lista_screen"

export default function App() {
  return (
    <>
      <ListaScreen />
      <StatusBar style="auto" />
    </>
  );
}