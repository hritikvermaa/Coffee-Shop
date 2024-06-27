import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from "../theme/theme"
import { BlurView } from '@react-native-community/blur'
import HomePage from '../screens/HomePage/HomePage'
import StudentList from '../screens/StudentListScreen/StudentList'
import CourseList from '../screens/CourseListScreen/CourseList'
import Dashboard from '../screens/Dashboard/Dashboard'
import CustomIcon from '../components/CustomIcon'


const Tab = createBottomTabNavigator();

const TabNavigators = () => {
  return (
     <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:styles.tabBarStyle,
        tabBarBackground:() => (
            <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
        )
        }}>
        <Tab.Screen name="home" component={HomePage}
         options={{
            tabBarIcon:({focused,color,size}) => (
                <CustomIcon 
                name="home" 
                size={25} 
                color={
                    focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex
                }
             />
            ),
        }} 
        ></Tab.Screen>
        <Tab.Screen name="StudentList" component={StudentList}  
        options={{
            tabBarIcon:({focused,color,size}) => (
                <CustomIcon 
                name="cart" 
                size={25} 
                color={
                    focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex
                }
             />
            ),
        }} 
        ></Tab.Screen>
         <Tab.Screen name="Dashboard" component={Dashboard} 
        options={{
            tabBarIcon:({focused,color,size}) => (
                <CustomIcon 
                name="like" 
                size={25} 
                color={
                    focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex
                }
             />
            ),
        }} 
        ></Tab.Screen>
        <Tab.Screen name="CourseList" component={CourseList} 
        options={{
            tabBarIcon:({focused,color,size}) => (
                <CustomIcon 
                name="bell" 
                size={25} 
                color={
                    focused?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex
                }
             />
            ),
        }} 
        ></Tab.Screen>

     </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    tabBarStyle:{
        height:80,
        position:'absolute',
        backgroundColor:COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation:0,
        borderTopColor:'transparent'
    },
    BlurViewStyles:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,

    },
});

export default TabNavigators

