import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({focused, title, icon}: {focused: boolean, title: string, icon: any}) =>     {
    if(focused){
        return (
            <ImageBackground source={images.highlight} className='flex flex-row w-full flex-1 min-w-[112px] min-h-16  justify-center items-center rounded-[50px] overflow-hidden' >
<Image source={icon} tintColor="#151312" className='size-5' />
<Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
</ImageBackground>
        )
    }
    return (
        <View className='size-full justify-center items-center  rounded-full '>
            <Image source={icon} tintColor="#A8B5DB" className='size-5' />
        </View>
    )
}


const _Layout = () => {
  return (
   <Tabs screenOptions={{tabBarShowLabel: false, tabBarIconStyle:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'

   },
   tabBarStyle:{
    backgroundColor: '#0f0D23',
    borderRadius:100,
    marginHorizontal:20,
    marginBottom:36,
    height:52,
    position:'absolute',
    overflow:'hidden',
    justifyContent: 'center',
    borderWidth:2,
    borderTopWidth:2,   
    borderColor:'#0F0D23',

   }
   
   }} >
    <Tabs.Screen name="index" options={{ headerShown: false, title: "Home",  tabBarIcon: ({focused}) => <>
<TabIcon focused={focused} title="Home" icon={icons.home}/>
    </> }} />
    <Tabs.Screen name="search" options={{ headerShown: false, title: "Search",  tabBarIcon: ({focused}) => <>
<TabIcon focused={focused} title="Search" icon={icons.search}/>
    </> }} />
    <Tabs.Screen name="saved" options={{ headerShown: false, title: "Saved",  tabBarIcon: ({focused}) => <>
<TabIcon focused={focused} title="Saved" icon={icons.save}/>
    </> }} />
    <Tabs.Screen name="profile" options={{ headerShown: false, title: "Profile",  tabBarIcon: ({focused}) => <>
<TabIcon focused={focused} title="Profile" icon={icons.person}/>
    </> }} />
   </Tabs>
  )
}

export default _Layout
