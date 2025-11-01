const TMDB_TOKEN = process.env.TMDB_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjMxYjg3ZDczNjUzZmNiYjhkMDBlY2RjODQ2YmMwNyIsIm5iZiI6MTc2MDA5MjM4OS4xOTYsInN1YiI6IjY4ZThlMGU1ZGUwMjI3ODczZDczZTEwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09Euac60QAdtMhpGmHC9Pe7602Ourrnn2cxg_ITE5LE'

export default async function tmdbFetch(pathWithQuery: string) {
    const res = await fetch(`https://api.themoviedb.org/3/${pathWithQuery}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`TMDB ${res.status}: ${text}`);
    }
    return res.json();
}