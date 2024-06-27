import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigators from './src/navigators/TabNavigators'
import AddStudent from './src/screens/AddStudentScreen/AddStudent'
import CourseDetail from './src/screens/CourseDetailScreen/CourseDetail'
import StudentDetail from './src/screens/StudentDetailScreen/StudentDetail'

const Stack =createNativeStackNavigator();


const App = () => {
  return( 
   <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigators} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="StudentDetail" component={StudentDetail} options={{animation:'slide_from_bottom'}} />
        <Stack.Screen name="AddStudent" component={AddStudent} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="CourseDetail" component={CourseDetail} options={{animation:'slide_from_bottom'}}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
};

export default App