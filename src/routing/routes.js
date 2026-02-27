export const routes = [
    {
        path: /^\/$/,
        view: async (app) => {
            const response = await fetch('src/pages/home/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/home/style.css")
        },
        loadScripts: async () => {
            await import("../pages/home/script.js")
        }
    },
    {
        path: /^\/movie$/,
        view: async (app) => {
            const response = await fetch('src/pages/movie/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            await import("../pages/movie/script.js")
        }
    }
]