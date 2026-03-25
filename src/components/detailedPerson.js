import { api } from "../libs/api"
import { movieGenres } from "./Movie"

export function DetailedPerson(item) {
    const container = document.querySelector(".person-content")
    const sectionsContainer = document.querySelector(".person-sections-container")

    container.innerHTML = ""
    sectionsContainer.innerHTML = ""

    // Hero
    const hero = document.createElement("div")
    hero.className = "person-hero-inner container"

    // Photo — centered, large
    const photoWrap = document.createElement("div")
    photoWrap.className = "person-photo-wrap"

    const photo = document.createElement("img")
    photo.className = "person-photo"
    photo.src = item.profile_path
        ? "https://image.tmdb.org/t/p/w500" + item.profile_path
        : "https://via.placeholder.com/400x600?text=No+Photo"
    photo.alt = item.name
    photoWrap.appendChild(photo)

    // Right column
    const right = document.createElement("div")
    right.className = "person-right"

    // Breadcrumb
    const breadcrumb = document.createElement("p")
    breadcrumb.className = "person-breadcrumb"
    breadcrumb.innerHTML = "Home &rsaquo; All persons &rsaquo; <span>" + item.name + "</span>"
    right.appendChild(breadcrumb)

    // Name
    const nameEl = document.createElement("h1")
    nameEl.className = "person-name"
    nameEl.textContent = item.name
    right.appendChild(nameEl)

    // Share icons
    const shareRow = document.createElement("div")
    shareRow.className = "person-share-row"

    const shareLinks = [
        { src: "/img/facebook.png",  alt: "Facebook" },
        { src: "/img/twitter.png",   alt: "Twitter"  },
        { src: "/img/instagram.png", alt: "Instagram" },
        { src: "/img/threads.png",   alt: "Threads"  },
    ]

    shareLinks.forEach(function(link) {
        const btn = document.createElement("button")
        btn.className = "person-share-btn"
        const img = document.createElement("img")
        img.src = link.src
        img.alt = link.alt
        btn.appendChild(img)
        shareRow.appendChild(btn)
    })
    right.appendChild(shareRow)

    // Information title
    const infoTitle = document.createElement("p")
    infoTitle.className = "person-info-title"
    infoTitle.textContent = "Information"
    right.appendChild(infoTitle)

    // Calculate age
    const genderMap = { 1: "Female", 2: "Male", 3: "Non-binary" }
    let birthdayDisplay = item.birthday || "—"
    if (item.birthday) {
        const birth = new Date(item.birthday)
        const today = new Date()
        const age = today.getFullYear() - birth.getFullYear() -
            (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0)
        const d  = String(birth.getDate()).padStart(2, "0")
        const mo = String(birth.getMonth() + 1).padStart(2, "0")
        const y  = birth.getFullYear()
        birthdayDisplay = d + "." + mo + "." + y + " (" + age + " years)"
    }

    const infoRows = [
        { label: "Career:",          value: item.known_for_department || "—" },
        { label: "Birthday:",        value: birthdayDisplay },
        { label: "Place of birth:",  value: item.place_of_birth || "—" },
        { label: "Gender:",          value: genderMap[item.gender] || "—" },
    ]

    const infoTable = document.createElement("div")
    infoTable.className = "person-info-table"

    infoRows.forEach(function(r) {
        const row = document.createElement("div")
        row.className = "person-info-row"

        const lbl = document.createElement("span")
        lbl.className = "person-info-label"
        lbl.textContent = r.label

        const val = document.createElement("span")
        val.className = "person-info-value"
        val.textContent = r.value

        row.appendChild(lbl)
        row.appendChild(val)
        infoTable.appendChild(row)
    })
    right.appendChild(infoTable)

    // Action buttons
    const actionRow = document.createElement("div")
    actionRow.className = "person-action-row"

    const listBtn = document.createElement("button")
    listBtn.className = "person-action-btn"
    listBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>'

    const favBtn = document.createElement("button")
    favBtn.className = "person-action-btn"
    favBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'

    actionRow.appendChild(listBtn)
    actionRow.appendChild(favBtn)
    right.appendChild(actionRow)

    hero.appendChild(photoWrap)
    hero.appendChild(right)
    container.appendChild(hero)

    // Movie credits
    api.get("/person/" + item.id + "/movie_credits").then(function(res) {

        // Best films — top 10 by rating
        const bestMovies = res.data.cast
            .filter(function(m) { return m.poster_path && m.vote_count > 50 })
            .sort(function(a, b) { return b.vote_average - a.vote_average })
            .slice(0, 10)

        if (bestMovies.length > 0) {
            const bestSection = document.createElement("section")
            bestSection.className = "person-section"

            const bestHeader = document.createElement("div")
            bestHeader.className = "person-section-header container"

            const bestTitle = document.createElement("h2")
            bestTitle.className = "person-section-title"
            bestTitle.textContent = "Best films"

            const bestPager = document.createElement("span")
            bestPager.className = "person-section-pager"
            bestPager.textContent = "1 / 1"

            bestHeader.appendChild(bestTitle)
            bestHeader.appendChild(bestPager)

            const bestGrid = document.createElement("div")
            bestGrid.className = "person-best-grid container"

            bestMovies.forEach(function(m) {
                const card = document.createElement("div")
                card.className = "person-best-card"
                card.style.cursor = "pointer"
                card.onclick = function() {
                    localStorage.setItem("movieId", m.id)
                    window.location.href = "/movie"
                }

                const posterWrap = document.createElement("div")
                posterWrap.className = "person-best-poster-wrap"

                const img = document.createElement("img")
                img.className = "person-best-poster"
                img.src = "https://image.tmdb.org/t/p/w500" + m.poster_path
                img.alt = m.title

                const badge = document.createElement("span")
                badge.className = "person-best-rating"
                badge.textContent = m.vote_average.toFixed(1)

                // hover overlay
                const overlay = document.createElement("div")
                overlay.className = "person-best-overlay"
                const moreBtn = document.createElement("button")
                moreBtn.className = "person-best-more-btn"
                moreBtn.textContent = "More"
                overlay.appendChild(moreBtn)

                posterWrap.appendChild(img)
                posterWrap.appendChild(badge)
                posterWrap.appendChild(overlay)

                const info = document.createElement("div")
                info.className = "person-best-info"

                const titleEl = document.createElement("p")
                titleEl.className = "person-best-title"
                titleEl.textContent = m.title

                const genresEl = document.createElement("p")
                genresEl.className = "person-best-genres"
                genresEl.textContent = (m.genre_ids || []).map(function(id) { return movieGenres[id] }).filter(Boolean).join(", ")

                info.appendChild(titleEl)
                info.appendChild(genresEl)
                card.appendChild(posterWrap)
                card.appendChild(info)
                bestGrid.appendChild(card)
            })

            bestSection.appendChild(bestHeader)
            bestSection.appendChild(bestGrid)
            sectionsContainer.appendChild(bestSection)
        }

        // Filmography list — max 10
        const allMovies = res.data.cast
            .filter(function(m) { return m.poster_path })
            .sort(function(a, b) { return (b.release_date || "").localeCompare(a.release_date || "") })
            .slice(0, 10)

        if (allMovies.length > 0) {
            const filmSection = document.createElement("section")
            filmSection.className = "person-section"

            const filmHeader = document.createElement("div")
            filmHeader.className = "person-section-header container"

            const filmTitle = document.createElement("h2")
            filmTitle.className = "person-section-title"
            filmTitle.textContent = "Movies"

            filmHeader.appendChild(filmTitle)

            const filmList = document.createElement("div")
            filmList.className = "person-film-list container"

            allMovies.forEach(function(m) {
                const row = document.createElement("div")
                row.className = "person-film-row"
                row.style.cursor = "pointer"
                row.onclick = function() {
                    localStorage.setItem("movieId", m.id)
                    window.location.href = "/movie"
                }

                const poster = document.createElement("img")
                poster.className = "person-film-poster"
                poster.src = "https://image.tmdb.org/t/p/w342" + m.poster_path
                poster.alt = m.title

                const info = document.createElement("div")
                info.className = "person-film-info"

                const titleYear = document.createElement("h3")
                titleYear.className = "person-film-title"
                titleYear.textContent = m.title + (m.release_date ? " " + m.release_date.slice(0, 4) : "")

                const genresEl = document.createElement("p")
                genresEl.className = "person-film-genres"
                genresEl.textContent = (m.genre_ids || []).map(function(id) { return movieGenres[id] }).filter(Boolean).join(", ")

                info.appendChild(titleYear)
                info.appendChild(genresEl)

                const ratingWrap = document.createElement("div")
                ratingWrap.className = "person-film-rating-wrap"

                const ratingNum = document.createElement("span")
                ratingNum.className = "person-film-rating"
                ratingNum.textContent = m.vote_average.toFixed(1)

                const ratingLabel = document.createElement("span")
                ratingLabel.className = "person-film-rating-label"
                ratingLabel.textContent = "Kinoarea"

                ratingWrap.appendChild(ratingNum)
                ratingWrap.appendChild(ratingLabel)

                const moreBtn = document.createElement("button")
                moreBtn.className = "person-film-more-btn"
                moreBtn.textContent = "More"
                moreBtn.onclick = function() {
                    localStorage.setItem("movieId", m.id)
                    window.location.href = "/movie"
                }

                row.appendChild(poster)
                row.appendChild(info)
                row.appendChild(ratingWrap)
                row.appendChild(moreBtn)

                filmList.appendChild(row)

                const divider = document.createElement("div")
                divider.className = "person-film-divider"
                filmList.appendChild(divider)
            })

            filmSection.appendChild(filmHeader)
            filmSection.appendChild(filmList)
            sectionsContainer.appendChild(filmSection)
        }
    })

    return container
}
