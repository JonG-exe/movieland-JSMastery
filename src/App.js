import React from 'react'
import { useState, useEffect } from 'react'
import SearchIcon from "./search.svg"
import MovieCard from './MovieCard'
import "./App.css"

// API key: ee6d6fd8

const API_URL = "https://www.omdbapi.com?apikey=ee6d6fd8"

// const movie1 = {
//     "Title": "Lois & Clark: The New Adventures of Superman",
//     "Year": "1993–1997",
//     "imdbID": "tt0106057",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGFjNzEtZWYzZC00ZmI0LTg2NmMtN2YyNTY4YzhlODIyXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg"
// }

const App = () => {

    const [searchTerm, setsearchTerm] = useState("")
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json()

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(searchTerm);
    }, [searchTerm])

  return (
    <div className="app">

        <h1>MovieLands</h1>

        <div className="search">
            
            <input 
                type="text"
                placeholder="Search for movies"
                value={searchTerm}
                onChange={ (e) => setsearchTerm(e.target.value) }
             />

            {movies? (

                <div class="search-suggestions">
                    {movies.map(movie => (
                        <div className="suggestion">{movie.Title}</div>
                    ))}
                </div>

            ): (<> </> )

            }

            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => {searchMovies(searchTerm)}}
            />

        </div>

        {
            movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map(movie => (
                            <MovieCard movie={movie}/>)
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
        }


    </div>
  )
}

export default App