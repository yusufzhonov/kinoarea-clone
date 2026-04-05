import { api } from "../libs/api"
import { header } from "./header"
import { footer } from "./footer"

export function MoviePhotos() {
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
        title.textContent = "Photos"

        const nav = document.createElement("p")
        nav.className = "subpage-breadcrumb"
        nav.innerHTML =
            `<span class="subpage-breadcrumb-link" onclick="window.location.href='/'">Home</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span class="subpage-breadcrumb-link" onclick="history.back()">${item.title}</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span>Photos</span>`

        hero.appendChild(title)
        hero.appendChild(nav)
        container.appendChild(hero)

        api.get(`/movie/${movieId}/images`).then(imgRes => {
            const seen = new Set()
            const backdrops = imgRes.data.backdrops.filter(b => {
                if (b.iso_639_1 !== null) return false
                if (seen.has(b.file_path)) return false
                seen.add(b.file_path)
                return true
            })

            const section = document.createElement("section")
            section.className = "movie-section"

            const groupTitle = document.createElement("h2")
            groupTitle.className = "subpage-group-title"
            groupTitle.textContent = `${item.title} (${backdrops.length})`

            const grid = document.createElement("div")
            grid.className = "photos-grid photos-grid--full"

            if (backdrops.length === 0) {
                const empty = document.createElement("p")
                empty.style.color = "#94a3b8"
                empty.style.padding = "20px 0"
                empty.textContent = "No photos available"
                grid.appendChild(empty)
            }

            backdrops.forEach(backdrop => {
                const wrap = document.createElement("div")
                wrap.className = "photo-wrap"

                const img = document.createElement("img")
                img.className = "photo-img"
                img.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`
                img.alt = item.title

                wrap.appendChild(img)
                grid.appendChild(wrap)
            })

            section.appendChild(groupTitle)
            section.appendChild(grid)
            sectionsContainer.appendChild(section)
        })
    })
}
