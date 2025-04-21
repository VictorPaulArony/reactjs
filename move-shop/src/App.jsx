import React, { useState, useEffect } from 'react';
import Search from './Components/Search.jsx';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY,
    },
  }
  
  

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="App">
      {/* Rest of your JSX remains the same */}
      <div className="blur-background">
        <div className="blur-overlay"></div>
      </div>
      
      <div className='container relative z-10'>
        <div className='content-wrapper'>
          <header className='flex flex-col items-center gap-4'>
            <div className='image-container'>
              <img 
                src='/src/assets/poster.png' 
                alt='poster'
                className='w-90 max-w-full h-auto rounded-lg shadow-lg'
              />
            </div>
            <div className='text-container backdrop-blur-sm bg-white/30 dark:bg-black/30 p-6 rounded-xl'>
              <h1 className='text-5xl font-bold text-center text-amber-600'>Movie Shop</h1>
            </div>
            <Search searchItem={searchItem} setSearchTerm={setSearchTerm}/>
          </header>
          
          <section className='all-movies mt-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>All Movies</h2>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {movies.map((movie) => (

                <div key={movie.id} className='movie-card bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                  <h3 className='text-xl font-semibold text-white'>{movie.title}</h3>
                  <span>{movie.release_date}</span>
                  <p className='text-gray-200 mt-2'>{movie.overview}</p>
                  <p className='text-gray-200 mt-2'>Popularity: {movie.popularity}</p>
                  <p className='text-amber-400 mt-2'>Rating: {movie.vote_average}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;