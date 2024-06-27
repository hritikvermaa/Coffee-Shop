import { create } from 'zustand'
import {produce} from 'immer'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

import CoffeeData from '../data/CoffeeData'
import BeansData from '../data/BeansData'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export const useStore = create(
    persist(
        (Set,get) => ({
            CoffeeList: CoffeeData,
            BeansList: BeansData,
            CartPrice:0,
            FavouriteList:[],
            CartList:[],
            OrderHistoryList:[],
            addToCart:(cartItem:any)=>set(produce(state => {
                let found=false;
                for(let i=0;i<state.CartList.length;i++){
                    if(state.CartList[i].id == cartItem.id){
                        found = true;
                        let size=false;
                        for(let j=0;j<state.CartList[i].prices.length;j++){
                            if(state.CartList[i].prices[j].size==cartItem.prices[0].size){
                                size=true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if(size==false){
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].price.sort((a:any,b:any)=>{
                            if(a.size>b.size){
                                return -1;
                            }
                            if(a.size<b.size){
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    }
                }
                if(found==false){
                    state.CartList.push(cartItem);
                }
            })),
        }), 
        {
            name:'coffee-app',
            storage:createJSONStorage(() => AsyncStorage)
        }
    )
)