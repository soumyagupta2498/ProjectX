import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CameraPage from './screens/CameraScreen';
import HomeActivity from './screens/HomeScreen';
import History from './screens/HistoryScreen';
import ResultCard from './screens/ResultScreen';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const Tabs = 
createMaterialTopTabNavigator({
  HomeActivity: { screen: HomeActivity },
  //Favourites : { screen: FavouritesActivity},
  History: { screen: History}
},
  {
    tabBarOptions: {
    activeTintColor: '#D3D3D3',
    inactiveTintColor: '#ffffff',
    inactiveBackgroundColor: '#353539',
    activeBackgroundColor: '#353539',
    showIcon: false,
    scrollEnabled:true,
    indicatorStyle: {
      borderBottomColor: '#ffffff',
      borderBottomWidth: 2,
    },
    labelStyle:{
      fontSize: 13,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style:{
      backgroundColor: '#2b2d2f',
    },
    tabStyle: {
      width:130,
      height:55,
    }
  },
}


);


const TabPages = createAppContainer(createStackNavigator({
  Tab:{ screen:Tabs,
      navigationOptions:()=>({
          headerShown : false
      }),},
  CameraPage: { screen: CameraPage },
  ResultCard: { screen: ResultCard }
},
));

export default TabPages;

const styles = StyleSheet.create({
  FlatListItemStyle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  viewStyle: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 40,
      padding: 16,
  },
  textStyle: {
      padding: 10,
  },
  textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 10,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
  },
}); 