import { Tabs } from "expo-router"
import React from "react"
import { SCREEN_HEIGHT, SCREEN_WIDTH_400 } from "../constants"
import { ClipboardIcon, Settings, Statistics } from "../svgs/navigation"

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#393E46',
                    borderTopWidth: 0,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: SCREEN_HEIGHT * 0.1
                },
                tabBarIconStyle: {
                    marginTop: SCREEN_WIDTH_400 ? 10 : 15
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    title: '',
                    headerShown: false, 
                    tabBarIcon: ({focused}) => <ClipboardIcon color={focused ? '#194A98' : '#222831'} size={SCREEN_WIDTH_400 ? '32': '43'}/>
                }}
            />
            <Tabs.Screen 
                name="statistics" 
                options={{
                    title: '', 
                    headerShown: false, 
                    tabBarIcon: ({focused}) => <Statistics color={focused ? '#194A98' : '#222831'} size={SCREEN_WIDTH_400 ? '32': '43'}/>
                }}
            />
            <Tabs.Screen 
                name="settings" 
                options={{
                    title: '', 
                    headerShown: false, 
                    tabBarIcon: ({focused}) => <Settings color={focused ? '#194A98' : '#222831'} size={SCREEN_WIDTH_400 ? '32': '43'}/>
                }}
            />
        </Tabs>
    )
}

export default React.memo(TabLayout)