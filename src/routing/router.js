import { routes } from "./routes"

export async function router() {
    const pathname = window.location.pathname
    const app = document.querySelector("#app")

    const route = routes.find((r) => pathname.match(r.path))

    if (!route) {
        return await renderNotFoundPage(app)
    }

    await route.view(app)
    await route.loadStyles()
    await route.loadScripts()
}

async function renderNotFoundPage(app) {
    console.log(app);

    const response = await fetch('src/pages/404/index.html')
    const page = await response.text()

    app.innerHTML = page
}