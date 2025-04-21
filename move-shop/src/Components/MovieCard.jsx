import React from 'react';

const MovieCard = ({ movie: {title, poster_path, vote_average, original_language, release_date} }) => {
  return (
    <div className="movie-card bg-dark-100 text-amber-50 dark:bg-gray-800 rounded-2xl shadow-inner shadow-light-100/10 overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        />
        <h3 className='text-lg font-bold  m-2'>{title}</h3>
      <div className="movie-overview flex gap-2 items-center align-middle">
        <div className='rating flex gap-2 items-center align-middle'>
            <img src="./src/assets/icon.png" alt="star icon" className='w-4 h-4 m-3' />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span>.</span>
        <p className='lang'> {original_language}</p>
        <span>.</span>
        <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;