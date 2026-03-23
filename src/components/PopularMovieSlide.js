import { movieGenres } from "./Movie"

export function PopularMovieSlide(item) {
    const slide = document.createElement("div")
    slide.className = "swiper-slide"

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

    const overlay = document.createElement("div")
    overlay.className = "overlay"

    const button = document.createElement("button")
    button.className = "moreBtn"
    button.textContent = "More"

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

    slide.appendChild(movieCard)
    return slide
}
