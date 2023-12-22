import { useState, useEffect } from 'react'
import Movie from './components/Movie'

const FEATURED_API = import.meta.env.VITE_APP_FEATURED_API
const SEARCH_API = import.meta.env.VITE_APP_SEARCH_API

function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = (API)=>{
    (async () => {
      const movieResp = await fetch(API)
      const moviesR = await movieResp.json()

      setMovies(moviesR.results)
    })()
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm("")
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container">
      <div className="header">
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder='Search...'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </div>
      <div className='movie-container'>
        {movies.map(movie => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  )
}

export default App
