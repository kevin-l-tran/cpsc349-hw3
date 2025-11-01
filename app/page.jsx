'use client'

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import tmdbFetch from "./components/utils";

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [orderCategory, setOrderCategory] = useState("popularity.desc");
  const [currentQuery, setCurrentQuery] = useState("orderMovies");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [configs, setConfigs] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchConfig = async () => {
      try {
        const data = await tmdbFetch("configuration");
        if (mounted) setConfigs(data);
      } catch (e) {
        console.error(e)
      }
    };
    fetchConfig();

    return () => { mounted = false; };
  }, []);

  const orderMovies = useCallback(async (sort: string, p: number) => {
    try {
      const data = await tmdbFetch(`discover/movie?sort_by=${encodeURIComponent(sort)}&page=${p}`);
      setMovies(data.results || []);
      setMaxPage(data.total_pages || 1);
    } catch (e) {
      console.error(e)
    }
  }, []);

  const searchMovies = useCallback(async (query: string, p: number) => {
    try {
      const data = await tmdbFetch(`search/movie?query=${encodeURIComponent(query)}&page=${p}`);
      setMovies(data.results || []);
      setMaxPage(data.total_pages || 1);
    } catch (e) {
      console.error(e)
    }
  }, []);

  useEffect(() => {
    orderMovies("popularity.desc", 1);
  }, [orderMovies]);

  const search = (q: string) => {
    if (q && q.trim()) {
      setCurrentQuery("searchMovies");
      setPage(1);
      searchMovies(q.trim(), 1);
    } else {
      setCurrentQuery("orderMovies");
      setPage(1);
      orderMovies(orderCategory, 1);
    }
  };

  // Trigger search/order when movieName changes
  useEffect(() => {
    search(movieName);
  }, [movieName]);

  // When sort order changes, reset to page 1 and fetch ordered list
  useEffect(() => {
    if (currentQuery !== "orderMovies") setCurrentQuery("orderMovies");
    setPage(1);
    orderMovies(orderCategory, 1);
  }, [orderCategory]);

  const goPrev = () => {
    if (page <= 1) return;
    const nextPage = page - 1;
    setPage(nextPage);
    if (currentQuery === "searchMovies" && movieName.trim()) {
      searchMovies(movieName.trim(), nextPage);
    } else {
      orderMovies(orderCategory, nextPage);
    }
  };

  const goNext = () => {
    if (page >= maxPage) return;
    const nextPage = page + 1;
    setPage(nextPage);
    if (currentQuery === "searchMovies" && movieName.trim()) {
      searchMovies(movieName.trim(), nextPage);
    } else {
      orderMovies(orderCategory, nextPage);
    }
  };

  const posterBase = configs?.images?.secure_base_url || "https://image.tmdb.org/t/p/";
  const getPosterUrl = (m: any) => {
    if (m?.poster_path) return `${posterBase}w300${m.poster_path}`;
    return "https://placehold.co/300x450?text=No+Poster+Found";
  };

  return (
    <div>
      <h1 className={styles.title}>Movie Explorer</h1>

      <search className={styles.searchMenu}>
        <input type="search"
          id="movieName"
          name="movieName"
          placeholder="Search for a movie..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <select
          id="orderCategory"
          name="orderCategory"
          value={orderCategory}
          onChange={(e) => setOrderCategory(e.target.value)}
        >
          <option value="popularity.desc">Popularity (Desc)</option>
          <option value="primary_release_date.asc">Release Date (Asc)</option>
          <option value="primary_release_date.desc">Release Date (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
        </select>
      </search>

      <main className={styles.main}>
        {movies.length === 0 && <h2>No movies were found.</h2>}
        {movies.length > 0 && movies.map((m: any) => (
          <article key={`${m.id}-${m.release_date || "na"}`} className={styles.movieCard}>
            <img src={getPosterUrl(m)} width={300} height={450} alt={m.title} />
            <h2>{m.title}</h2>
            <p>Release date: {m.release_date}</p>
            <p>Rating: {m.vote_average}</p>
          </article>
        ))}
      </main>

      <nav aria-label="pagination" className={styles.navBar}>
        <button id="prevPage" name="prevPage" type="button" onClick={goPrev} disabled={page <= 1}>Previous</button>
        <p>Page {page} of {maxPage}</p>
        <button id="nextPage" name="nextPage" type="button" onClick={goNext} disabled={page >= maxPage}>Next</button>
      </nav>
    </div>
  );
}
