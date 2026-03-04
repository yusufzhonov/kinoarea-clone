export function Movie(item) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    // poster
    const poster = document.createElement("div");
    poster.className = "poster";

    // img
    const img = document.createElement("img");
    img.src = item.poster_path
    img.alt = item.original_title;

    // rating
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent = "8";

    // movie-info
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    // title
    const title = document.createElement("h3");
    title.textContent = item.original_title;

    // genres
    const genres = document.createElement("p");
    genres.className = "genres";
    genres.textContent = item.genre_ids;

    // собираем структуру
    poster.appendChild(img);
    poster.appendChild(rating);

    movieInfo.appendChild(title);
    movieInfo.appendChild(genres);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    return movieCard
}