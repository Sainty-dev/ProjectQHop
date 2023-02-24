import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CaptureScreen from '../views/CaptureScreen';
import DisplayScreen from '../views/DisplayScreen';
import HomeScreen from '../views/HomeScreen';
import { Icon } from '@rneui/themed';
import { AppConstants } from '../constants/AppConstants';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      
      headerShown:false, 
      tabBarStyle:{backgroundColor:AppConstants.Colors.PRIMARY},
      tabBarActiveTintColor:'white'
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Display" component={DisplayScreen} />
      <Tab.Screen name="Capture" component={CaptureScreen} />
    </Tab.Navigator>
  );
};
export default TabNavigation;
