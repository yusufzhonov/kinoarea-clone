import { api } from "../libs/api"
import { header } from "./header"
import { footer } from "./footer"

export function MovieTrailers() {
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
        title.textContent = "Trailers"

        const nav = document.createElement("p")
        nav.className = "subpage-breadcrumb"
        nav.innerHTML =
            `<span class="subpage-breadcrumb-link" onclick="window.location.href='/'">Home</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span class="subpage-breadcrumb-link" onclick="history.back()">${item.title}</span>` +
            ` <span class="subpage-breadcrumb-sep">›</span> ` +
            `<span>Trailers</span>`

        hero.appendChild(title)
        hero.appendChild(nav)
        container.appendChild(hero)

        api.get(`/movie/${movieId}/videos`).then(vidRes => {
            const videos = vidRes.data.results
                .filter(v => v.site === "YouTube")
                .slice(0, 6)

            const section = document.createElement("section")
            section.className = "movie-section"

            if (videos.length === 0) {
                const empty = document.createElement("p")
                empty.style.color = "#94a3b8"
                empty.style.padding = "20px 0"
                empty.textContent = "No trailers available"
                section.appendChild(empty)
            } else {
                const grid = document.createElement("div")
                grid.className = "trailers-all-grid"

                videos.forEach(video => {
                    const item = document.createElement("div")
                    item.className = "trailers-all-item"

                    // Thumbnail with YouTube logo — click replaces with iframe
                    const thumb = document.createElement("div")
                    thumb.className = "trailers-all-thumb"

                    const img = document.createElement("img")
                    img.className = "trailers-all-img"
                    img.src = `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`
                    img.alt = video.name
                    img.onerror = function () {
                        this.src = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`
                    }

                    // YouTube logo button
                    const ytBtn = document.createElement("div")
                    ytBtn.className = "trailers-all-yt-btn"
                    ytBtn.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path class="trailers-yt-shape" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>`

                    thumb.appendChild(img)
                    thumb.appendChild(ytBtn)

                    thumb.onclick = () => {
                        const iframe = document.createElement("iframe")
                        iframe.src = `https://www.youtube.com/embed/${video.key}?autoplay=1`
                        iframe.setAttribute("allowfullscreen", "")
                        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                        iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
                        thumb.innerHTML = ""
                        thumb.style.cursor = "default"
                        thumb.onclick = null
                        thumb.appendChild(iframe)
                    }

                    // Info row below thumbnail
                    const info = document.createElement("div")
                    info.className = "trailers-all-info"

                    const videoTitle = document.createElement("p")
                    videoTitle.className = "trailers-all-title"
                    videoTitle.textContent = video.name

                    const date = document.createElement("p")
                    date.className = "trailers-all-date"
                    if (video.published_at) {
                        const d = new Date(video.published_at)
                        date.textContent = d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    }

                    info.appendChild(videoTitle)
                    info.appendChild(date)

                    item.appendChild(thumb)
                    item.appendChild(info)
                    grid.appendChild(item)
                })

                section.appendChild(grid)
            }

            sectionsContainer.appendChild(section)
        })
    })
}
