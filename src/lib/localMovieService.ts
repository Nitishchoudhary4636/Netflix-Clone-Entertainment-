import { MOVIE_GENRES } from "src/data/genres";
import { LOCAL_MOVIES } from "src/data/movies";
import { PaginatedMovieResult } from "src/types/Common";
import { Genre } from "src/types/Genre";
import { Movie, MovieDetail } from "src/types/Movie";

const PAGE_SIZE = 8;

function getGenreIds(movie: MovieDetail) {
  return movie.genres.map((genre) => genre.id);
}

function toMovie(detail: MovieDetail): Movie {
  const {
    poster_path,
    adult,
    overview,
    release_date,
    id,
    original_title,
    original_language,
    title,
    backdrop_path,
    popularity,
    vote_count,
    video,
    vote_average,
  } = detail;
  return {
    poster_path,
    adult,
    overview,
    release_date,
    genre_ids: getGenreIds(detail),
    id,
    original_title,
    original_language,
    title,
    backdrop_path,
    popularity,
    vote_count,
    video,
    vote_average,
  };
}

function paginate(movies: Movie[], page: number): PaginatedMovieResult {
  const total_results = movies.length;
  const total_pages = Math.max(1, Math.ceil(total_results / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), total_pages);
  const start = (safePage - 1) * PAGE_SIZE;
  const results = movies.slice(start, start + PAGE_SIZE);

  return {
    page: safePage,
    total_pages,
    total_results,
    results,
  };
}

function sortByPopularity(movies: MovieDetail[]) {
  return [...movies].sort((a, b) => b.popularity - a.popularity);
}

function sortByRating(movies: MovieDetail[]) {
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
}

function sortByReleaseDate(movies: MovieDetail[], ascending = false) {
  return [...movies].sort((a, b) => {
    const diff =
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    return ascending ? diff : -diff;
  });
}

export function getLocalGenres(): Genre[] {
  return MOVIE_GENRES;
}

export function getLocalConfiguration() {
  return {
    images: {
      base_url: "",
      secure_base_url: "",
      backdrop_sizes: ["w300", "w780", "original"],
      logo_sizes: [],
      poster_sizes: ["w300", "w500"],
      profile_sizes: [],
      still_sizes: [],
    },
    change_keys: [],
  };
}

export function getMoviesByCustomList(
  apiString: string,
  page: number
): PaginatedMovieResult {
  let sorted = sortByPopularity(LOCAL_MOVIES);

  switch (apiString) {
    case "top_rated":
      sorted = sortByRating(LOCAL_MOVIES);
      break;
    case "now_playing":
      sorted = sortByReleaseDate(LOCAL_MOVIES).slice(0, 12);
      break;
    case "upcoming":
      sorted = sortByReleaseDate(LOCAL_MOVIES, true).slice(-8);
      break;
    default:
      break;
  }

  return paginate(sorted.map(toMovie), page);
}

export function getMoviesByGenreId(
  genreId: number,
  page: number
): PaginatedMovieResult {
  const filtered = LOCAL_MOVIES.filter((movie) =>
    getGenreIds(movie).includes(genreId)
  );
  return paginate(sortByPopularity(filtered).map(toMovie), page);
}

export function getMovieDetail(id: number): MovieDetail | undefined {
  return LOCAL_MOVIES.find((movie) => movie.id === id);
}

export function getSimilarMovies(id: number): PaginatedMovieResult {
  const source = LOCAL_MOVIES.find((movie) => movie.id === id);
  if (!source) {
    return { page: 1, total_pages: 1, total_results: 0, results: [] };
  }

  const sourceGenres = getGenreIds(source);
  const similar = LOCAL_MOVIES.filter(
    (movie) =>
      movie.id !== id &&
      getGenreIds(movie).some((genreId) => sourceGenres.includes(genreId))
  );

  return paginate(sortByPopularity(similar).map(toMovie), 1);
}
