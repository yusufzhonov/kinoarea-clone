import { movieGenres } from "./Movie"

export function SearchMovie(item) {
    const card = document.createElement("div")
    card.className = "search-card"

    const poster = document.createElement("img")
    poster.className = "search-poster"
    poster.src = "https://image.tmdb.org/t/p/original" + item.poster_path

    const info = document.createElement("div")
    info.className = "search-info"

    const title = document.createElement("h2")
    title.textContent = item.title

    const genres = document.createElement("p")
    genres.className = "search-genres"
    genres.textContent = item.genre_ids.map(id => movieGenres[id] || "Unknown")

    const rating = document.createElement("div")
    rating.className = "search-rating"
    rating.textContent = item.vote_average.toFixed(1)

    info.appendChild(title)
    info.appendChild(genres)

    card.appendChild(poster)
    card.appendChild(info)
    card.appendChild(rating)

    card.onclick = () => {
        window.location.href = "/movie"
        localStorage.setItem("movieId", item.id)
    }
    
    return card
}
