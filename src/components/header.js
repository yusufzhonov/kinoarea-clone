export function header() {
    let header = document.querySelector("header")

    header.innerHTML = `
    <div class="container head-cn">
        <div>
            <div class="header-left-top">
                <a href="/" class="logo-title"><img src="https://kinoarea.com/front/img/logo-icon.svg" width="22px"
                        height="22px" alt="">Kino<span>area</span></a>
                <ul>
                    <li><a href="#" class="logo-link"><img src="https://kinoarea.com/front/icons/threads.svg"
                                alt=""></a></li>
                    <li><a href="#" class="logo-link"><img src="/img/insta.png" alt=""></a></li>
                    <li><a href="#" class="logo-link"> <svg width="18px" height="18px" viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg" fill="#fff" class="bi bi-facebook">
                                <path
                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </a></li>
                    <li><a href="#" class="logo-link"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px"
                                viewBox="0 0 512 512">
                                <path fill="#fff"
                                    d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
                            </svg></a></li>
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

    let headCn = document.querySelector(".head-cn")
    const headerRight = document.createElement("div")
    headerRight.className = "header-right"

    const searchBtn = document.createElement("button")
    searchBtn.className = "search"

    let close_search_window = document.querySelector(".close-search-window")
    let search_waindow = document.querySelector(".overhide")

    if (close_search_window) {
        close_search_window.onclick = () => {
            search_waindow.classList.remove("show")
            search_waindow.classList.add("hide")
        }
    }

    searchBtn.onclick = () => {
        let overlay = document.querySelector(".overhide")
        if (overlay) {
            overlay.classList.add("show")
            overlay.classList.remove("hide")
        }
    }

    const loginBtn = document.createElement("button");
    loginBtn.className = "login";

    headerRight.appendChild(searchBtn);
    headerRight.appendChild(loginBtn);
    headCn.append(headerRight)
}
