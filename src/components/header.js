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
                <li><a href="/premiere" class="center-link" onclick="event.preventDefault();window.location.href='/premiere'">Premiere</a></li>
                <li><a href="/films" class="center-link" onclick="event.preventDefault();window.location.href='/films'">Films</a></li>
                <li><a href="/media" class="center-link" onclick="event.preventDefault();window.location.href='/media'">Media</a></li>
                <li><a href="/persons" class="center-link" onclick="event.preventDefault();window.location.href='/persons'">Persons</a></li>
                <li><a href="/collections" class="center-link" onclick="event.preventDefault();window.location.href='/collections'">Collections</a></li>
                <li><a href="/upcoming" class="center-link" onclick="event.preventDefault();window.location.href='/upcoming'">Upcoming</a></li>
                <li><a href="#" class="center-link" id="header-search-link">Search</a></li>
            </ul>
        </div>
    </div>

    <!-- Login overlay -->
    <div class="login-overhide hide">
        <div class="login-screen">
            <a href="/" class="logo-title login-logo"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="22px" height="22px" alt="">Kino<span>area</span></a>
            <button class="close-login-window" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <h1 class="login-title">Login</h1>
            <div class="inputs">
                <form class="login-form">
                    <input type="text" id="email-login" name="email_input" class="email-input user-inp" placeholder="Email" autocomplete="off">
                    <input type="text" id="name-login" name="name_input" class="name-input user-inp" placeholder="Name" autocomplete="off">
                    <div class="login-error hide" id="login-error">Please enter a valid email and name (2+ letters)</div>
                    <button type="submit" class="login-btn">Login</button>
                </form>
            </div>
            <a href="#" class="link-privacy">Privacy Policy</a>
        </div>
    </div>
    `

    const headCn = document.querySelector(".head-cn")
    const headerRight = document.createElement("div")
    headerRight.className = "header-right"

    const searchBtn = document.createElement("button")
    searchBtn.className = "search"
    searchBtn.setAttribute("aria-label", "Open search")
    searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    headerRight.appendChild(searchBtn)

    // Login / User block
    let account = (() => { try { return JSON.parse(sessionStorage.getItem("log-datas")) } catch { return null } })()

    const loginOverlay = document.querySelector(".login-overhide")
    const closeLoginBtn = document.querySelector(".close-login-window")
    const loginForm = document.querySelector(".login-form")
    const loginError = document.querySelector("#login-error")

    function buildUserBlock(data) {
        const userDats = document.createElement("div")
        userDats.className = "user-dats"
        userDats.style.cursor = "pointer"
        userDats.title = "Your profile"

        const avatarBox = document.createElement("div")
        avatarBox.className = "log-avatar"
        const img = document.createElement("img")
        img.src = data.avatarUrl || "https://kinoarea.com/front/img/comment-no-author.png"
        img.className = "user-icon"
        avatarBox.appendChild(img)

        const userNames = document.createElement("div")
        userNames.className = "user-names"
        const hello = document.createElement("p")
        hello.className = "word-hello"
        hello.textContent = "Hello"
        const personName = document.createElement("p")
        personName.className = "person-name"
        personName.textContent = data.name
        userNames.append(hello, personName)

        userDats.append(avatarBox, userNames)
        userDats.addEventListener("click", () => { window.location.href = "/profile" })
        return userDats
    }

    if (account) {
        headerRight.appendChild(buildUserBlock(account))
    } else {
        const loginBtn = document.createElement("button")
        loginBtn.className = "login"

        loginBtn.onclick = () => {
            loginOverlay.classList.remove("hide")
            loginOverlay.classList.add("show")
        }

        closeLoginBtn.onclick = () => {
            loginOverlay.classList.remove("show")
            loginOverlay.classList.add("hide")
        }
        loginOverlay.addEventListener("click", (e) => {
            if (e.target === loginOverlay) {
                loginOverlay.classList.remove("show")
                loginOverlay.classList.add("hide")
            }
        })

        loginForm.onsubmit = (e) => {
            e.preventDefault()
            const fd = new FormData(loginForm)
            const regexes = {
                "email_input": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/,
                "name_input": /^[a-zA-Za-zA-Z\s]{2,}$/
            }
            let valid = true
            document.querySelectorAll(".user-inp").forEach(inp => {
                if (!regexes[inp.name]?.test(inp.value)) valid = false
            })
            if (!valid) { loginError.classList.remove("hide"); return }
            loginError.classList.add("hide")

            const saveUser = (sessionId) => {
                const datas = {
                    email: fd.get("email_input"),
                    name: fd.get("name_input"),
                    sessionId,
                    avatarUrl: "https://kinoarea.com/front/img/comment-no-author.png"
                }
                sessionStorage.setItem("log-datas", JSON.stringify(datas))
                loginBtn.remove()
                loginOverlay.classList.remove("show")
                loginOverlay.classList.add("hide")
                headerRight.appendChild(buildUserBlock(datas))
            }

            api.get("authentication/guest_session/new")
                .then(res => saveUser(res.data.guest_session_id))
                .catch(() => saveUser(null))
        }

        headerRight.appendChild(loginBtn)
    }

    headCn.append(headerRight)

    // Search overlay logic
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
        if (!query || query.trim().length < 2) { if (resultsEl) resultsEl.innerHTML = ""; return }
        api.get(`/search/${type}?query=${encodeURIComponent(query)}`).then(res => {
            if (!resultsEl) return
            resultsEl.innerHTML = ""
            const items = res.data.results || []
            if (items.length === 0) { resultsEl.innerHTML = `<p style="color:#64748b;text-align:center;padding:30px 0;">Nothing found for "${query}"</p>`; return }
            if (type === "person") render(items.slice(0, 10), resultsEl, searchPerson)
            else render(items.slice(0, 10), resultsEl, SearchMovie)
        })
    }

    const currentPath = window.location.pathname
    document.querySelectorAll(".header-menu .center-link").forEach(link => {
        const href = link.getAttribute("href")
        if (href && href !== "#" && currentPath.startsWith(href)) {
            link.style.color = "#fff"
            link.style.borderBottom = "2px solid #3657cb"
            link.style.paddingBottom = "2px"
        }
    })

    const searchNavLink = document.getElementById("header-search-link")
    if (searchNavLink) searchNavLink.onclick = (e) => { e.preventDefault(); openSearch() }

    searchBtn.onclick = openSearch
    if (closeBtn) closeBtn.onclick = closeSearch
    overlay.onclick = (e) => { if (e.target === overlay) closeSearch() }
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSearch() })
    if (input) {
        input.addEventListener("input", () => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => doSearch(input.value, currentType), 320)
        })
    }
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"))
            tab.classList.add("active")
            currentType = tab.dataset.type
            if (input && input.value.trim().length >= 2) doSearch(input.value, currentType)
        })
    })
}
