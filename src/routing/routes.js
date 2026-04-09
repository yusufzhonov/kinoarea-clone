export const routes = [
    {
        path: /^\/$/,
        view: async (app) => {
            const response = await fetch('/pages/home/index.html')
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
        path: /^\/films$/,
        view: async (app) => {
            const response = await fetch('/pages/films/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/films/style.css")
        },
        loadScripts: async () => {
            await import("../pages/films/script.js")
        }
    },
    {
        path: /^\/premiere$/,
        view: async (app) => {
            const response = await fetch('/pages/premiere/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/premiere/style.css")
        },
        loadScripts: async () => {
            await import("../pages/premiere/script.js")
        }
    },
    {
        path: /^\/persons$/,
        view: async (app) => {
            const response = await fetch('/pages/persons/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/persons/style.css")
        },
        loadScripts: async () => {
            await import("../pages/persons/script.js")
        }
    },
    {
        path: /^\/collections$/,
        view: async (app) => {
            const response = await fetch('/pages/collections/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/collections/style.css")
        },
        loadScripts: async () => {
            await import("../pages/collections/script.js")
        }
    },
    {
        path: /^\/upcoming$/,
        view: async (app) => {
            const response = await fetch('/pages/upcoming/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/upcoming/style.css")
        },
        loadScripts: async () => {
            await import("../pages/upcoming/script.js")
        }
    },
    {
        path: /^\/movie$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            await import("../pages/movie/script.js")
        }
    },
    {
        path: /^\/media$/,
        view: async (app) => {
            const response = await fetch('/pages/media/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/media/style.css")
        },
        loadScripts: async () => {
            await import("../pages/media/script.js")
        }
    },
    {
        path: /^\/movie\/actors$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            const { MovieActors } = await import("../components/MovieActors.js")
            MovieActors()
        }
    },
    {
        path: /^\/movie\/trailers$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            const { MovieTrailers } = await import("../components/MovieTrailers.js")
            MovieTrailers()
        }
    },
    {
        path: /^\/movie\/posters$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            const { MoviePosters } = await import("../components/MoviePosters.js")
            MoviePosters()
        }
    },
    {
        path: /^\/movie\/photos$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            const { MoviePhotos } = await import("../components/MoviePhotos.js")
            MoviePhotos()
        }
    },
    {
        path: /^\/person$/,
        view: async (app) => {
            const response = await fetch('/pages/person/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/person/style.css")
        },
        loadScripts: async () => {
            await import("../pages/person/script.js")
        }
    },
    {
        path: /^\/profile$/,
        view: async (app) => {
            const response = await fetch('/pages/profile/index.html')
            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/profile/style.css")
        },
        loadScripts: async () => {
            await import("../pages/profile/script.js")
        }
    },
]

export const notFound = {
    view: async (app) => {
        const response = await fetch('/pages/error/index.html')
        app.innerHTML = await response.text()
    },
    loadStyles: async () => {
        await import("../pages/error/style.css")
    },
    loadScripts: async () => {
        await import("../pages/error/script.js")
    }
}
