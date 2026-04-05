import { api } from "../libs/api"
import { header } from "./header"
import { footer } from "./footer"

export function MovieActors() {
    header()
    footer()

    const container = document.querySelector(".movie-content")
    const sectionsContainer = document.querySelector(".movie-sections-container")
    const bgBox = document.querySelector(".bg-box")

    container.innerHTML = ""
    sectionsContainer.innerHTML = ""

    const movieId = JSON.parse(localStorage.getItem("movieId"))

    api.get(`/movie/${movieId}`).then(res => {
        const item = res.data

        bgBox.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        bgBox.style.backgroundSize = "cover"
        bgBox.style.backgroundPosition = "center"

        // Hero: title + breadcrumb only, no back button
        const hero = document.createElement("div")
        hero.className = "subpage-hero container"

        const title = document.createElement("h1")
        title.className = "subpage-title"
        title.textContent = "All persons"

        const nav = document.createElement("p")
        nav.className = "subpage-breadcrumb"
        nav.innerHTML =
            `<span class="subpage-breadcrumb-link" onclick="window.location.href='/'">Home</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span class="subpage-breadcrumb-link" onclick="history.back()">${item.title}</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span>All persons</span>`

        hero.appendChild(title)
        hero.appendChild(nav)
        container.appendChild(hero)

        api.get(`/movie/${movieId}/credits`).then(credRes => {
            const section = document.createElement("section")
            section.className = "movie-section"

            const groupTitle = document.createElement("h2")
            groupTitle.className = "subpage-group-title"
            groupTitle.textContent = "Actors"

            const castGrid = document.createElement("div")
            castGrid.className = "cast-grid cast-grid--full"

            credRes.data.cast.forEach(actor => {
                const card = document.createElement("div")
                card.className = "cast-card"
                card.style.cursor = "pointer"
                card.onclick = () => {
                    localStorage.setItem("personId", actor.id)
                    window.location.href = "/person"
                }

                const photo = document.createElement("img")
                photo.className = "cast-photo"
                photo.src = actor.profile_path
                    ? `https://image.tmdb.org/t/p/w342${actor.profile_path}`
                    : "https://via.placeholder.com/150x200?text=No+Photo"
                photo.alt = actor.name

                const actorName = document.createElement("p")
                actorName.className = "cast-name"
                actorName.textContent = actor.name

                const charName = document.createElement("p")
                charName.className = "cast-char"
                charName.textContent = actor.character

                card.appendChild(photo)
                card.appendChild(actorName)
                card.appendChild(charName)
                castGrid.appendChild(card)
            })

            section.appendChild(groupTitle)
            section.appendChild(castGrid)
            sectionsContainer.appendChild(section)
        })
    })
}
