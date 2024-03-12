const Api_Key = "4a5297f8de0fe7b0f9c9233a9839a8da";
// 'https://api.themoviedb.org/3/movie/top_rated?language=en-US'
//'https://api.themoviedb.org/3/discover/tv?api_key=${Api_Key}&with_networks=213'
// https://api.themoviedb.org/3/discover/movie?api_key=4a5297f8de0fe7b0f9c9233a9839a8da&with_genres=28
//https://api.themoviedb.org/3/discover/movie?api_key=4a5297f8de0fe7b0f9c9233a9839a8da&with_genres=35
// https://api.themoviedb.org/3/discover/movie?api_key=4a5297f8de0fe7b0f9c9233a9839a8da&with_genres=27
//https://api.themoviedb.org/3/discover/movie?api_key=4a5297f8de0fe7b0f9c9233a9839a8da&with_genres=99
//https://api.themoviedb.org/3/discover/movie?api_key=4a5297f8de0fe7b0f9c9233a9839a8da&with_genres=10749

const requests = {
  toprated: `/movie/top_rated?api_key=${Api_Key}&language=en-US`,
  trending: `/trending/all/week?api_key=${Api_Key}&language=en-US`,
  orginals: `/discover/tv?api_key=${Api_Key}&with_networks=213`,
  action: `/discover/movie?api_key=${Api_Key}&with_genres=28`,
  comedy: `/discover/movie?api_key=${Api_Key}&with_genres=35`,
  romance: `/discover/movie?api_key=${Api_Key}&with_genres=10749`,
  docmitrey: `/discover/movie?api_key=${Api_Key}&with_genres=99`,
  horro: `/discover/movie?api_key=${Api_Key}&with_genres=27`,
};
export default requests;
