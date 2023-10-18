// вынес повторяющийся код
export const movieDuratationCounter = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
};

export const filterMoviesByQuery = (movies, query) => {
  return movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(query.toLowerCase())
  );
};
