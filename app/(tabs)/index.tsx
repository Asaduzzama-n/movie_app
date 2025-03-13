import MovieCard from "@/components/card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const { data: movies = [], loading: moviesLoading, error: moviesError } = useFetch(() =>
    getMovies({ query: "superman" })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row items-center justify-center mt-20">
              <Image source={icons.logo} className="size-14" />
            </View>
            <View className="my-5">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for movies, series, or people"
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">Error: {moviesError}</Text>
            )}
            {!moviesLoading && !moviesError && movies?.length > 0 && (
              <>
                <Text className="text-white text-xl font-bold ">
                  Latest Movies
                </Text>
              </>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-xl font-bold ">
                No movies found
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}