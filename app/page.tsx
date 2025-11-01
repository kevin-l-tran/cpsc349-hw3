'use client'

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [orderCategory, setOrderCategory] = useState("popularity.desc");
  const [currentQuery, setCurrentQuery] = useState("orderMovies");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [configs, setConfigs] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <p>cool</p>
      </main>

      <nav aria-label="pagination" className={styles.navBar}>
        <button id="prevPage" name="prevPage" type="button">Previous</button>
        <p>Page X of Y</p>
        <button id="nextPage" name="nextPage" type="button">Next</button>
      </nav>
    </div>
  );
}
