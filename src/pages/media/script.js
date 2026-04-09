import { api } from "../../libs/api"
import { header } from "../../components/header"
import { footer } from "../../components/footer"

header()
footer()

// Tab navigation
const tabs = document.querySelectorAll(".media-tab")
const sections = document.querySelectorAll(".media-section")

function activateTab(sectionId) {
    tabs.forEach(t => t.classList.toggle("media-tab--active", t.dataset.section === sectionId))
    const target = document.getElementById(sectionId)
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
}

tabs.forEach(tab => {
    tab.addEventListener("click", e => {
        e.preventDefault()
        activateTab(tab.dataset.section)
    })
})

const hash = window.location.hash.replace("#", "")
if (hash && ["trailers", "posters", "photos"].includes(hash)) {
    setTimeout(() => activateTab(hash), 100)
} else {
    tabs[0]?.classList.add("media-tab--active")
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tabs.forEach(t => t.classList.toggle("media-tab--active", t.dataset.section === entry.target.id))
        }
    })
}, { threshold: 0.3 })
sections.forEach(s => observer.observe(s))

// Lightbox
let lbImages = []
let lbIndex  = 0

function openLightbox(images, index) {
    lbImages = images
    lbIndex  = index

    const existing = document.querySelector(".media-lightbox")
    if (existing) existing.remove()

    const lb = document.createElement("div")
    lb.className = "media-lightbox"

    const inner = document.createElement("div")
    inner.className = "media-lightbox-inner"

    const img = document.createElement("img")
    img.src = lbImages[lbIndex]
    inner.appendChild(img)

    const closeBtn = document.createElement("button")
    closeBtn.className = "media-lightbox-close"
    closeBtn.innerHTML = "✕"
    closeBtn.onclick = () => lb.remove()

    const prevBtn = document.createElement("button")
    prevBtn.className = "media-lightbox-prev"
    prevBtn.innerHTML = "‹"
    prevBtn.onclick = () => {
        lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length
        img.src = lbImages[lbIndex]
    }

    const nextBtn = document.createElement("button")
    nextBtn.className = "media-lightbox-next"
    nextBtn.innerHTML = "›"
    nextBtn.onclick = () => {
        lbIndex = (lbIndex + 1) % lbImages.length
        img.src = lbImages[lbIndex]
    }

    lb.onclick = e => { if (e.target === lb) lb.remove() }

    document.addEventListener("keydown", function onKey(e) {
        if (!document.querySelector(".media-lightbox")) { document.removeEventListener("keydown", onKey); return }
        if (e.key === "Escape") lb.remove()
        if (e.key === "ArrowLeft")  { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; img.src = lbImages[lbIndex] }
        if (e.key === "ArrowRight") { lbIndex = (lbIndex + 1) % lbImages.length; img.src = lbImages[lbIndex] }
    })

    lb.appendChild(inner)
    lb.appendChild(closeBtn)
    if (lbImages.length > 1) {
        lb.appendChild(prevBtn)
        lb.appendChild(nextBtn)
    }
    document.body.appendChild(lb)
}

// Trailers
const trailersGrid = document.querySelector(".media-trailers-grid")

api.get("/movie/now_playing").then(res => {
    const movies = res.data.results.slice(0, 12)

    Promise.all(movies.map(m => api.get(`/movie/${m.id}/videos`))).then(videoResults => {
        const trailerItems = []
        videoResults.forEach((vr, i) => {
            const trailer = vr.data.results.find(v => v.type === "Trailer" && v.site === "YouTube")
            if (trailer) trailerItems.push({ movie: movies[i], key: trailer.key, published: trailer.published_at })
        })

        trailerItems.slice(0, 12).forEach(({ movie, key, published }) => {
            const item = document.createElement("div")
            item.className = "media-trailer-item"

            const thumbWrap = document.createElement("div")
            thumbWrap.className = "media-trailer-thumb"
            thumbWrap.style.cursor = "pointer"

            const thumb = document.createElement("img")
            thumb.className = "media-trailer-img"
            thumb.src = `https://img.youtube.com/vi/${key}/maxresdefault.jpg`
            thumb.alt = movie.title

            const playIcon = document.createElement("div")
            playIcon.className = "media-trailer-play"
            playIcon.innerHTML = `<svg viewBox="0 0 24 24" width="52" height="52"><circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.45)"/><polygon points="9.5,7 18,12 9.5,17" fill="white"/></svg>`

            let iframe = null
            thumbWrap.onclick = () => {
                if (iframe) return
                thumb.style.display = "none"
                playIcon.style.display = "none"
                iframe = document.createElement("iframe")
                iframe.className = "media-trailer-iframe"
                iframe.src = `https://www.youtube.com/embed/${key}?autoplay=1`
                iframe.setAttribute("allowfullscreen", "")
                iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                thumbWrap.appendChild(iframe)
            }

            thumbWrap.appendChild(thumb)
            thumbWrap.appendChild(playIcon)

            const info = document.createElement("div")
            info.className = "media-trailer-info"

            const titleEl = document.createElement("span")
            titleEl.className = "media-trailer-title"
            titleEl.textContent = movie.title

            const dateEl = document.createElement("span")
            dateEl.className = "media-trailer-date"
            if (published) {
                const d = new Date(published)
                dateEl.textContent = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            }

            info.appendChild(titleEl)
            info.appendChild(dateEl)
            item.appendChild(thumbWrap)
            item.appendChild(info)
            trailersGrid.appendChild(item)
        })
    })
})

// Posters - lightbox on click
const postersGrid = document.querySelector(".media-posters-grid")

api.get("/movie/popular").then(res => {
    const movies = res.data.results

    Promise.all(movies.slice(0, 20).map(m => api.get(`/movie/${m.id}/images`))).then(imgResults => {
        const posters = []
        imgResults.forEach((ir, i) => {
            const p = ir.data.posters.find(p => p.iso_639_1 === "en" || p.iso_639_1 === null)
            if (p) posters.push({ movie: movies[i], file_path: p.file_path })
        })

        const posterUrls = posters.slice(0, 16).map(p => `https://image.tmdb.org/t/p/original${p.file_path}`)

        posters.slice(0, 16).forEach(({ movie, file_path }, idx) => {
            const card = document.createElement("div")
            card.className = "media-poster-card"
            card.style.cursor = "pointer"
            card.onclick = () => openLightbox(posterUrls, idx)

            const img = document.createElement("img")
            img.className = "media-poster-img"
            img.src = `https://image.tmdb.org/t/p/w500${file_path}`
            img.alt = movie.title

            const title = document.createElement("p")
            title.className = "media-poster-title"
            title.textContent = movie.title

            card.appendChild(img)
            card.appendChild(title)
            postersGrid.appendChild(card)
        })
    })
})

// Photos - lightbox on click
const photosGrid = document.querySelector(".media-photos-grid")

api.get("/movie/now_playing").then(res => {
    const movies = res.data.results

    Promise.all(movies.slice(0, 15).map(m => api.get(`/movie/${m.id}/images`))).then(imgResults => {
        const photos = []
        imgResults.forEach((ir, i) => {
            const b = ir.data.backdrops.find(b => b.iso_639_1 === null)
            if (b) photos.push({ movie: movies[i], file_path: b.file_path })
        })

        const photoUrls = photos.slice(0, 12).map(p => `https://image.tmdb.org/t/p/original${p.file_path}`)

        photos.slice(0, 12).forEach(({ movie, file_path }, idx) => {
            const card = document.createElement("div")
            card.className = "media-photo-card"
            card.style.cursor = "pointer"
            card.onclick = () => openLightbox(photoUrls, idx)

            const img = document.createElement("img")
            img.className = "media-photo-img"
            img.src = `https://image.tmdb.org/t/p/original${file_path}`
            img.alt = movie.title

            const title = document.createElement("p")
            title.className = "media-photo-title"
            title.textContent = movie.title

            card.appendChild(img)
            card.appendChild(title)
            photosGrid.appendChild(card)
        })
    })
})
