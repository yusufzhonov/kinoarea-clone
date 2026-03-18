export const movieGenres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
}

export function Movie(item) {

    const movieCard = document.createElement("div")
    movieCard.className = "movie-card"

    const poster = document.createElement("div")
    poster.className = "poster"

    const img = document.createElement("img")
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
    img.alt = item.original_title

    const rating = document.createElement("div")
    rating.className = "rating"
    rating.textContent = item.vote_average.toFixed(1)

    const movieInfo = document.createElement("div")
    movieInfo.className = "movie-info"

    const title = document.createElement("h3")
    title.textContent = item.title

    const genres = document.createElement("p")
    genres.className = "genres"
    genres.textContent = item.genre_ids.map(id => movieGenres[id] || "Unknown")

    const overlay = document.createElement('div')
    overlay.className = 'overlay'

    const button = document.createElement('button')
    button.className = 'moreBtn'
    button.textContent = 'More'

    overlay.appendChild(button)

    poster.appendChild(overlay)

    poster.appendChild(img)
    poster.appendChild(rating)

    movieInfo.appendChild(title)
    movieInfo.appendChild(genres)

    movieCard.appendChild(poster)
    movieCard.appendChild(movieInfo)

    movieCard.onclick = () => {
        window.location.href = "/movie"
        localStorage.setItem("movieId", item.id)
    }
    return movieCard
}