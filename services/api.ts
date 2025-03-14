const TMDB_CONFIG = {
    BASE_URL: process.env.EXPO_TMDB_MOVIE_API_URL || 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        'Authorization': `Bearer ${process.env.EXPO_TMDB_MOVIE_ACCESSTOKEN}`,
        'Accept': 'application/json'
    }
};

export const getMovies = async ({ query }: { query: string }) => {
    console.log("Query:", query);

    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${TMDB_CONFIG.API_KEY}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    console.log("Endpoint:", endpoint);

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    console.log("Response Status:", response.status, response.statusText);

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
};