const movieGenres = {
    28: " Action",
    12: " Adventure",
    16: " Animation",
    35: " Comedy",
    80: " Crime",
    99: " Documentary",
    18: " Drama",
    10751: " Family",
    14: " Fantasy",
    36: " History",
    27: " Horror",
    10402: " Music",
    9648: " Mystery",
    10749: " Romance",
    878: " Science Fiction",
    10770: " TV Movie",
    53: " Thriller",
    10752: " War",
    37: " Western"
};
export function Movie(item) {

    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    // poster
    const poster = document.createElement("div");
    poster.className = "poster";

    // img
    const img = document.createElement("img");
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
    img.alt = item.original_title;

    // rating
    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent = item.vote_average.toFixed(1);

    // movie-info
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";

    // title
    const title = document.createElement("h3");
    title.textContent = item.title;

    // genres
    const genres = document.createElement("p");
    genres.className = "genres";
    genres.textContent = item.genre_ids.map(id => movieGenres[id] || "Unknown");

    // overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // создаём кнопку
    const button = document.createElement('button');
    button.className = 'moreBtn';
    button.textContent = 'More';

    // вкладываем кнопку в overlay
    overlay.appendChild(button);

    // добавляем overlay в карточку
    poster.appendChild(overlay);

    // собираем структуру
    poster.appendChild(img);
    poster.appendChild(rating);

    movieInfo.appendChild(title);
    movieInfo.appendChild(genres);

    movieCard.appendChild(poster);
    movieCard.appendChild(movieInfo);

    movieCard.onclick = () => {
        localStorage.setItem('movieId', item.id)

        window.location.href = "/movie"
    }

    return movieCard
}