import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "../components/custom_tab_bar/CustomTabBar";


const TabLayout = () => {

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props}/>}
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tabs.Screen name='index'/>
            <Tabs.Screen name='statistics'/>
            <Tabs.Screen name='settings'/>
        </Tabs>
    )
}

export default React.memo(TabLayout)