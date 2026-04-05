import { api } from "../libs/api"
import { header } from "./header"
import { footer } from "./footer"

export function MoviePosters() {
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

        const hero = document.createElement("div")
        hero.className = "subpage-hero container"

        const title = document.createElement("h1")
        title.className = "subpage-title"
        title.textContent = "Posters"

        const nav = document.createElement("p")
        nav.className = "subpage-breadcrumb"
        nav.innerHTML =
            `<span class="subpage-breadcrumb-link" onclick="window.location.href='/'">Home</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span class="subpage-breadcrumb-link" onclick="history.back()">${item.title}</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span>Posters</span>`

        hero.appendChild(title)
        hero.appendChild(nav)
        container.appendChild(hero)

        api.get(`/movie/${movieId}/images`).then(imgRes => {
            const seen = new Set()
            const posters = imgRes.data.posters.filter(p => {
                if (p.iso_639_1 !== null && p.iso_639_1 !== "en") return false
                if (seen.has(p.file_path)) return false
                seen.add(p.file_path)
                return true
            })

            const section = document.createElement("section")
            section.className = "movie-section"

            const groupTitle = document.createElement("h2")
            groupTitle.className = "subpage-group-title"
            groupTitle.textContent = `${item.title} (${posters.length})`

            const grid = document.createElement("div")
            grid.className = "posters-grid--full"

            if (posters.length === 0) {
                const empty = document.createElement("p")
                empty.style.color = "#94a3b8"
                empty.style.padding = "20px 0"
                empty.textContent = "No posters available"
                grid.appendChild(empty)
            }

            posters.forEach(poster => {
                const img = document.createElement("img")
                img.className = "poster-img poster-img--large"
                img.src = `https://image.tmdb.org/t/p/original${poster.file_path}`
                img.alt = item.title
                grid.appendChild(img)
            })

            section.appendChild(groupTitle)
            section.appendChild(grid)
            sectionsContainer.appendChild(section)
        })
    })
}
