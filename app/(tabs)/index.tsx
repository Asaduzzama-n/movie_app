
import MovieCard from "@/components/card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  const router = useRouter()

  const { data:movies, loading:moviesLoading, error:moviesError } = useFetch(() => getMovies({query: ''})) 


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={true} // Correct prop name
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image
          source={icons.logo}
          className="size-14 mt-20 mb-5 mx-auto"
        />
         {
          moviesLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
          ) : moviesError ? (
            <Text className="text-white">{moviesError}</Text>
          ) : (
            <View className="flex-1 mt-5 ">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search for movies, series, or people"
            />
              <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
          )
        }
        
       
      </ScrollView>
    </View>
  );
}
