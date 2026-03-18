import { movieGenres } from "./Movie"
import { api } from "../libs/api"

export function DetailedMovie(item) {
    let container = document.querySelector(".movie-content")
    let sectionsContainer = document.querySelector(".movie-sections-container")
    let bgBox = document.querySelector(".bg-box")

    container.innerHTML = ""

    bgBox.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    bgBox.style.backgroundSize = "cover"
    bgBox.style.backgroundPosition = "center"

    let parentBox = document.createElement("div")
    parentBox.className = "parent-box"

    let bottomContainer = document.createElement("div")
    bottomContainer.className = "bottomContainer"

    const left = document.createElement("div")
    left.className = "cn-movie-left"

    const img = document.createElement("img")
    img.className = "movie-left-img"
    img.src = `https://image.tmdb.org/t/p/original${item.poster_path}`

    left.appendChild(img)

    const right = document.createElement("div")
    right.className = "cn-movie-right"

    const navigation = document.createElement("p")
    navigation.className = "navigation"
    navigation.textContent = `Home > Films > ${item.title}`

    const title = document.createElement("h3")
    title.className = "movie-title"
    title.textContent = item.title

    const smallTitle = document.createElement("p")
    smallTitle.className = "movie-small-title"
    smallTitle.textContent = `${item.title} (${item.release_date.slice(0, 4)})`

    const diagrams = document.createElement("div")
    diagrams.className = "diagrams"

    for (let i = 0; i < 3; i++) {
        const btn = document.createElement("button")
        btn.className = "diagram-btns"
        diagrams.appendChild(btn)
    }

    const description = document.createElement("p")
    description.className = "description"
    description.textContent = item.overview

    const trailerBtn = document.createElement("button")
    trailerBtn.className = "trailer-btn"
    trailerBtn.innerHTML = `<span class="play-icon">▶</span> Watch Trailer`

    const smallData = document.createElement("div")
    smallData.className = "small-data"

    const productionCompanies = item.production_companies?.map(c => c.name).join(", ") || "—"
    const budget = item.budget > 0 ? "$" + item.budget.toLocaleString() : "—"
    const revenue = item.revenue > 0 ? "$" + item.revenue.toLocaleString() : "—"

    const data = [
        { label: "Premiere World", value: item.release_date },
        { label: "Runtime", value: item.runtime ? item.runtime + " min" : "—" },
        { label: "Slogan", value: item.tagline || "—" },
        { label: "Genre", value: item.genres?.map(g => movieGenres[g.id] || g.name).join(", ") || "—" },
        { label: "Year", value: item.release_date.slice(0, 4) },
        { label: "Country", value: item.production_countries?.map(c => c.name).join(", ") || "—" },
        { label: "Language", value: item.original_language?.toUpperCase() || "—" },
        { label: "Studios", value: productionCompanies },
        { label: "Budget", value: budget },
        { label: "Revenue", value: revenue },
        { label: "Status", value: item.status || "—" },
        { label: "Rating", value: (item.vote_average?.toFixed(1) || "—") + " (" + (item.vote_count || 0) + " votes)" },
    ]

    data.forEach(({ label, value }) => {
        const p = document.createElement("p")
        p.className = "movie-parameters"
        p.setAttribute("data-label", label)
        const valueSpan = document.createElement("span")
        valueSpan.className = "param-value"
        valueSpan.textContent = value
        p.appendChild(valueSpan)
        smallData.appendChild(p)
    })

    right.appendChild(navigation)
    right.appendChild(title)
    right.appendChild(smallTitle)
    right.appendChild(diagrams)
    right.appendChild(description)
    right.appendChild(trailerBtn)

    parentBox.appendChild(left)
    parentBox.appendChild(right)
    bottomContainer.append(smallData)
    container.append(parentBox, bottomContainer)

    // ── Starring ──────────────────────────────────────────────────────────────
    const castSection = document.createElement("section")
    castSection.className = "movie-section"

    const castHeader = document.createElement("div")
    castHeader.className = "section-header"

    const castTitle = document.createElement("h2")
    castTitle.className = "section-title"
    castTitle.textContent = "Starring"

    const castAllLink = document.createElement("a")
    castAllLink.className = "section-all-link"
    castAllLink.href = "#"
    castAllLink.textContent = "All actors →"

    castHeader.appendChild(castTitle)
    castHeader.appendChild(castAllLink)

    const castGrid = document.createElement("div")
    castGrid.className = "cast-grid"

    castSection.appendChild(castHeader)
    castSection.appendChild(castGrid)
    sectionsContainer.appendChild(castSection)

    api.get(`/movie/${item.id}/credits`).then(res => {
        const cast = res.data.cast.slice(0, 10)
        cast.forEach(actor => {
            const card = document.createElement("div")
            card.className = "cast-card"

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
    })

    //Trailer
    const trailerSection = document.createElement("section")
    trailerSection.className = "movie-section"

    const trailerHeader = document.createElement("div")
    trailerHeader.className = "section-header"

    const trailerSectionTitle = document.createElement("h2")
    trailerSectionTitle.className = "section-title"
    trailerSectionTitle.textContent = "Trailer"

    const trailerAllLink = document.createElement("a")
    trailerAllLink.className = "section-all-link"
    trailerAllLink.href = "#"
    trailerAllLink.textContent = "All trailers →"

    trailerHeader.appendChild(trailerSectionTitle)
    trailerHeader.appendChild(trailerAllLink)

    const trailerBox = document.createElement("div")
    trailerBox.className = "trailer-box"

    const iframe = document.createElement("iframe")
    iframe.className = "trailer-iframe"
    iframe.setAttribute("allowfullscreen", "")
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")

    trailerBox.appendChild(iframe)
    trailerSection.appendChild(trailerHeader)
    trailerSection.appendChild(trailerBox)
    sectionsContainer.appendChild(trailerSection)

    api.get(`/movie/${item.id}/videos`).then(res => {
        const trailer = res.data.results.find(v => v.type === "Trailer" && v.site === "YouTube")
        if (trailer) {
            iframe.src = `https://www.youtube.com/embed/${trailer.key}`
        } else {
            trailerBox.innerHTML = `<p style="color:#94a3b8;padding:20px;">Trailer not available</p>`
        }
    })

    trailerBtn.onclick = () => {
        trailerSection.scrollIntoView({ behavior: "smooth" })
    }

    //Movie posters + Photos from the movi
    api.get(`/movie/${item.id}/images`).then(res => {
        const seenPosters = new Set()
        const posters = res.data.posters
            .filter(p => {
                if (p.iso_639_1 !== null && p.iso_639_1 !== "en") return false
                const sizeKey = `${p.width}x${p.height}`
                if (seenPosters.has(p.file_path) || seenPosters.has(sizeKey)) return false
                seenPosters.add(p.file_path)
                seenPosters.add(sizeKey)
                return true
            })
            .slice(0, 6)

        const seenBackdrops = new Set()
        const backdrops = res.data.backdrops
            .filter(b => {
                if (b.iso_639_1 !== null) return false
                const sizeKey = `${b.width}x${b.height}`
                if (seenBackdrops.has(b.file_path) || seenBackdrops.has(sizeKey)) return false
                seenBackdrops.add(b.file_path)
                seenBackdrops.add(sizeKey)
                return true
            })
            .slice(0, 4)

        //Posters
        if (posters.length > 0) {
            const postersSection = document.createElement("section")
            postersSection.className = "movie-section"

            const postersHeader = document.createElement("div")
            postersHeader.className = "section-header"

            const postersSectionTitle = document.createElement("h2")
            postersSectionTitle.className = "section-title"
            postersSectionTitle.textContent = "Movie posters"

            const postersAllLink = document.createElement("a")
            postersAllLink.className = "section-all-link"
            postersAllLink.href = "#"
            postersAllLink.textContent = "All posters →"

            postersHeader.appendChild(postersSectionTitle)
            postersHeader.appendChild(postersAllLink)

            const postersSubtitle = document.createElement("p")
            postersSubtitle.className = "section-subtitle"
            postersSubtitle.textContent = item.title

            const postersGrid = document.createElement("div")
            postersGrid.className = "posters-grid"

            posters.forEach(poster => {
                const posterImg = document.createElement("img")
                posterImg.className = "poster-img"
                posterImg.src = `https://image.tmdb.org/t/p/original${poster.file_path}`
                posterImg.alt = item.title
                postersGrid.appendChild(posterImg)
            })

            postersSection.appendChild(postersHeader)
            postersSection.appendChild(postersSubtitle)
            postersSection.appendChild(postersGrid)
            sectionsContainer.appendChild(postersSection)
        }

        //Photos
        if (backdrops.length > 0) {
            const photosSection = document.createElement("section")
            photosSection.className = "movie-section"

            const photosHeader = document.createElement("div")
            photosHeader.className = "section-header"

            const photosSectionTitle = document.createElement("h2")
            photosSectionTitle.className = "section-title"
            photosSectionTitle.textContent = "Photos from the movie"

            const photosAllLink = document.createElement("a")
            photosAllLink.className = "section-all-link"
            photosAllLink.href = "#"
            photosAllLink.textContent = "All photos →"

            photosHeader.appendChild(photosSectionTitle)
            photosHeader.appendChild(photosAllLink)

            const photosSubtitle = document.createElement("p")
            photosSubtitle.className = "section-subtitle"
            photosSubtitle.textContent = item.title

            const photosGrid = document.createElement("div")
            photosGrid.className = "photos-grid"

            backdrops.forEach(backdrop => {
                const imgWrap = document.createElement("div")
                imgWrap.className = "photo-wrap"

                const photoImg = document.createElement("img")
                photoImg.className = "photo-img"
                photoImg.src = `https://image.tmdb.org/t/p/original${backdrop.file_path}`
                photoImg.alt = item.title

                imgWrap.appendChild(photoImg)
                photosGrid.appendChild(imgWrap)
            })

            photosSection.appendChild(photosHeader)
            photosSection.appendChild(photosSubtitle)
            photosSection.appendChild(photosGrid)
            sectionsContainer.appendChild(photosSection)
        }
    })

    return container
}
