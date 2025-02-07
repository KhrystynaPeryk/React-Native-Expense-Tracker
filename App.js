import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

// a component for a BottomTabs only
const ExpensesOverview = () => {
  // we can also pass a function in screenOptions, this way we will get hold of parameters that are passed into it
  return <BottomTabs.Navigator screenOptions={({navigation}) => (
    {
      headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => <IconButton icon='add' size={24} color={tintColor} onPressAction={() => {
        navigation.navigate('ManageExpense')
      }} />
    }
  )}>
    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => <Ionicons name='hourglass' size={size} color={color} />
    }}/>
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All',
      tabBarIcon: ({color, size}) => <Ionicons name='calendar' size={size} color={color} />
    }}/>
  </BottomTabs.Navigator>
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white'
          }}>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
              headerShown: false
            }} />
            <Stack.Screen name='ManageExpense' component={ManageExpense} options={{
              presentation: 'modal' // does not change much on android, but looks like a modal on ios
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
