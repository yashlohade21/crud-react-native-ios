// App.js

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notes from "./components/Notes";
import Crud from "./components/Crud";
import EditScreen from "./components/Edit";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Crud">
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Crud" component={Crud} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}