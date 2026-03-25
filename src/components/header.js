import { api } from "../libs/api"
import { render } from "../libs/render"
import { SearchMovie } from "./searchMovie"
import { searchPerson } from "./searchPerson"

export function header() {
    let header = document.querySelector("header")

    header.innerHTML = `
    <div class="container head-cn">
        <div>
            <div class="header-left-top">
                <a href="/" class="logo-title"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="22px"
                        height="22px" alt="">Kino<span>area</span></a>
                <ul>
                    <li><a href="#" class="logo-link"><img src="https://kinoarea.com/front/icons/threads.svg" alt=""></a></li>
                    <li><a href="#" class="logo-link"><img src="/img/insta.png" alt=""></a></li>
                    <li><a href="#" class="logo-link">
                        <svg width="18px" height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                    </a></li>
                    <li><a href="#" class="logo-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 512 512">
                            <path fill="#fff" d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"/>
                        </svg>
                    </a></li>
                </ul>
            </div>
        </div>
        <div class="header-center">
            <ul class="header-menu">
                <li><a href="/" class="center-link">Premiere</a></li>
                <li><a href="/" class="center-link">Films</a></li>
                <li><a href="/" class="center-link">Media</a></li>
                <li><a href="/" class="center-link">Persons</a></li>
                <li><a href="/" class="center-link">Collections</a></li>
                <li><a href="/" class="center-link">Upcoming</a></li>
                <li><a href="/" class="center-link">Search</a></li>
            </ul>
        </div>
    </div>`

    const headCn = document.querySelector(".head-cn")
    const headerRight = document.createElement("div")
    headerRight.className = "header-right"

    // Search button
    const searchBtn = document.createElement("button")
    searchBtn.className = "search"
    searchBtn.setAttribute("aria-label", "Open search")
    searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`

    // Login button
    const loginBtn = document.createElement("button")
    loginBtn.className = "login"

    headerRight.appendChild(searchBtn)
    headerRight.appendChild(loginBtn)
    headCn.append(headerRight)

    // ── Search overlay logic ──────────────────────────────────────────────
    const overlay   = document.querySelector(".overhide")
    const input     = document.querySelector(".search-content")
    const closeBtn  = document.querySelector(".search-close-btn")
    const resultsEl = document.querySelector("#search-results")
    const tabs      = document.querySelectorAll(".search-tab, .type")

    if (!overlay) return

    let currentType = "movie"
    let debounceTimer = null

    function openSearch() {
        overlay.classList.remove("hide")
        overlay.classList.add("show")
        setTimeout(() => input && input.focus(), 80)
    }

    function closeSearch() {
        overlay.classList.remove("show")
        overlay.classList.add("hide")
        if (input) input.value = ""
        if (resultsEl) resultsEl.innerHTML = ""
    }

    function doSearch(query, type) {
        if (!query || query.trim().length < 2) {
            if (resultsEl) resultsEl.innerHTML = ""
            return
        }
        api.get(`/search/${type}?query=${encodeURIComponent(query)}`).then(res => {
            if (!resultsEl) return
            resultsEl.innerHTML = ""
            const items = res.data.results || []
            if (items.length === 0) {
                resultsEl.innerHTML = `<p style="color:#64748b;text-align:center;padding:30px 0;">Nothing found for "${query}"</p>`
                return
            }
            if (type === "person") {
                render(items.slice(0, 10), resultsEl, searchPerson)
            } else {
                render(items.slice(0, 10), resultsEl, SearchMovie)
            }
        })
    }

    // Open
    searchBtn.onclick = openSearch

    // Close button
    if (closeBtn) closeBtn.onclick = closeSearch

    // Close on backdrop click
    overlay.onclick = (e) => {
        if (e.target === overlay) closeSearch()
    }

    // Close on Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSearch()
    })

    // Input typing with debounce
    if (input) {
        input.addEventListener("input", () => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => {
                doSearch(input.value, currentType)
            }, 320)
        })
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")
            currentType = tab.dataset.type
            if (input && input.value.trim().length >= 2) {
                doSearch(input.value, currentType)
            }
        })
    })
}
