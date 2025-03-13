import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/card";
import useFetch from "@/services/useFetch";
import { getMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/search-bar";

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => getMovies({ query: searchTerm }), false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (searchTerm.trim()) {
        loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchTerm]);

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
                value={searchTerm}
                onChangeText={(text: string) => setSearchTerm(text)}
                placeholder="Search for movies, series, or people"
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">Error: {error}</Text>
            )}
            {!loading && !error && searchTerm.trim() && movies?.length > 0 && (
              <>
                <Text className="text-white text-xl font-bold ">
                  Search Results for{" "}
                  <Text className="text-purple-300">{searchTerm}</Text>
                </Text>
              </>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-white text-xl font-bold ">
                {searchTerm.trim() ? "No movies found" : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;