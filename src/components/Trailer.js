import { api } from "../libs/api"

export function Trailer(item) {
    const slide = document.createElement("div")
    slide.className = "swiper-slide"

    const thumbWrap = document.createElement("div")
    thumbWrap.className = "trailer-thumb"

    const img = document.createElement("img")
    img.src = "https://image.tmdb.org/t/p/w780" + item.backdrop_path
    img.alt = item.title

    const overlay = document.createElement("div")
    overlay.className = "trailer-overlay"
    overlay.innerHTML = `<div class="trailer-play"><svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M8 5v14l11-7z"/></svg></div>`

    thumbWrap.append(img, overlay)

    const p = document.createElement("p")
    p.className = "swiper-slide__title"
    p.textContent = item.title

    slide.append(thumbWrap, p)

    let iframe = document.querySelector(".new-trailer-video iframe")
    let trailersTitle = document.querySelector(".trailers__title")

    slide.onclick = () => {
        api.get(`/movie/${item.id}/videos`)
            .then(res => {
                let trailer = res.data.results.find(item => item.type == "Trailer")
                trailersTitle.textContent = item.title
                iframe.src = `https://www.youtube.com/embed/${trailer.key}`
            })
    }

    return slide
}
