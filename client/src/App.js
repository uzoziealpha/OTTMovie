import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from './components/AddFavourites';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);




  const getMovieRequest = async(searchValue) => {
     const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=`;

     const response = await fetch(url);
     const responseJson = await response.json();


     if (responseJson.Search){
       setMovies(responseJson.Search);
     }
  };

  useEffect(()=> {
    getMovieRequest(searchValue);
  }, [searchValue]);


  const AddFavouriteMovie = (movie) => {
   const newFavouriteList = [...favourites, movie];
   setFavourites(newFavouriteList)
  }

  return (
    <div className="container-fluid movie-app">
       <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies'/>  
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
       </div>
      <div className="row">
        <MovieList 
           movies={movies}
           handleFavouritesClick={AddFavouriteMovie}
           favouriteComponent={AddFavourite} 
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
         <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
        />
      </div>

    </div>
  );
}

export default App;
