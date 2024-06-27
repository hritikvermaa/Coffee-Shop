import React, { useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, TextInput, FlatList, Animated } from 'react-native'
import HomePageStyle from './HomePageStyle'
import { useStore } from '../../store/store'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import { COLORS, FONTSIZE } from '../../theme/theme'
import HeaderBar from '../../components/HeaderBar'
import CustomIcon from '../../components/CustomIcon'
import CoffeCard from '../../components/CoffeCard'

const getCategoriesFromData=(data: any) => {
  let temp:any ={};
  for(let i=0;i<data.length;i++)
    {
      if(temp[data[i].name]===undefined){
        temp[data[i].name]=1;
      }
      else{
        temp[data[i].name]++;
      }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};

const getCoffeList = (category:string,data:any)=>{
    if(category== "All"){
      return data;

    }else {
      let CoffeeList=data.filter((item:any)=>item.name == category);
      return CoffeeList;
    }
} ;

const HomePage = ({navigation}:any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories,setcategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText,setSearchText] = useState('');
  const [categoryIndex,setcategoryIndex] = useState({
    index:1,
    category:categories[1],
  });
  const [sortedCoffee,setSortedCoffee]= useState(getCoffeList(categoryIndex.category ,CoffeeList));
  const [isCoffeeList, setIsCoffeeList] = useState(true); 

  const ListRef:any = useRef<FlatList>();

  const tabBarHeight = useBottomTabBarHeight();

  
  const searchCoffee = (search:string) => {
    if(search != ''){
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset:0,
      });
      setcategoryIndex({index:0,category: categories[0]});
      setSortedCoffee(
        [...CoffeeList.filter((item:any) => 
          item.name.toLowerCase().includes(search.toLowerCase()),
    ),]
    );
    }
  };

  const resetSearchCoffe = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset:0,
    });
    setcategoryIndex({index:0,category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  }
 
  return (
 

      <View style={HomePageStyle.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={HomePageStyle.ScrollViewFlex} >
         {/* App Header */}
         <HeaderBar  />

         <Text style={HomePageStyle.ScreenTitle}>Hello {'\n'}Good Morning</Text>
         {/* Search Input */}

         <View style={HomePageStyle.InpuContainerComponent}>
          <TouchableOpacity onPress={()=>{
            searchCoffee(searchText);
          }}>
            <CustomIcon 
            style={HomePageStyle.InputIcon} 
            name="search" size={FONTSIZE.size_18} 
            color={searchText.length > 0 ?COLORS.primaryOrangeHex:COLORS.primaryLightGreyHex} />
            </TouchableOpacity>
          <TextInput 
          placeholder='Search' 
          value={searchText} 
          onChangeText={text => {
            setSearchText(text)
            searchCoffee(text);
          }}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={HomePageStyle.TextInputContainer}
            />
            {searchText.length > 0 ? (
              <TouchableOpacity onPress={() => {
                resetSearchCoffe();
              }}>
              <CustomIcon 
              style={HomePageStyle.InputIcon}
              name="close" 
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
           ) : (
              <></>
              )}
         </View>
         {/* Category Scroller */}
         <ScrollView 
         horizontal 
         showsHorizontalScrollIndicator={false} 
         contentContainerStyle={HomePageStyle.CategoryScrollViewStyle} 
         >
          {categories.map((data,index) => (
            <View
            key={index.toString()}
            style={HomePageStyle.CategoryScrollViewContainer}
            >
              <TouchableOpacity 
              style={HomePageStyle.CategoryScrollViewItem}
              onPress={()=>{
                ListRef?.current?.scrollToOffset({
                  animated:true,
                  offset:0,
                })
                setcategoryIndex({index:index,category:categories[index]});
                setSortedCoffee([...getCoffeList(categories[index],CoffeeList)]);
              }}>
                <Text 
                style={[HomePageStyle.CategoryText,
                categoryIndex.index == index ? {color:COLORS.primaryOrangeHex}:{}]}>
                  {data}
                </Text>
                {categoryIndex.index == index ?<View 
                style={HomePageStyle.ActiveCategory} />:<></> }
              </TouchableOpacity>
            </View>
          ))}
         </ScrollView>

         {/* coffe flatlist */}
          
        <FlatList 
        ref = {ListRef}
        horizontal
        ListEmptyComponent={
          <View style={HomePageStyle.EmptyListContainer}>
            <Text style={HomePageStyle.CategoryText}>No coffee Available</Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee}
        contentContainerStyle={HomePageStyle.FlatListContainer}
        keyExtractor={item=> item.id}
        renderItem={({item})=>{
          return (
          <TouchableOpacity onPress={() => {
            navigation.push('CourseDetail');
          }}>
            <CoffeCard 
             id={item.id}
             index={item.index}
             type={item.type}
             rosted={item.rosted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             price={item.prices[2]}
             buttonPressHandler={()=> {}}
            />
          </TouchableOpacity>
          );
        }}
        />
      <Text style={HomePageStyle.CoffeBeansTitle}>Coffe Beans</Text>
         {/* Beans flatList */}

         <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee} // in place of sortedCoffe we have to put BeanList
        contentContainerStyle={[HomePageStyle.FlatListContainer,{marginBottom:tabBarHeight}]}
        keyExtractor={item=> item.id}
        renderItem={({item})=>{
          return (
          <TouchableOpacity onPress={() => {
            navigation.push('CourseDetail');
          }}>
            <CoffeCard 
             id={item.id}
             index={item.index}
             type={item.type}
             rosted={item.rosted}
             imagelink_square={item.imagelink_square}
             name={item.name}
             special_ingredient={item.special_ingredient}
             average_rating={item.average_rating}
             price={item.prices[2]}
             buttonPressHandler={()=> {}}
            />
          </TouchableOpacity>
          );
        }}
        />

        </ScrollView>
      </View>
    
      
      
  
  )
}

export default HomePage