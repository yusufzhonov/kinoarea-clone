import { movieGenres } from "./Movie"

let container = document.querySelector(".container")
let bgBox = document.querySelector(".bg-box")

export function DetailedMovie(item) {

    bgBox.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`;
    let parentBox = document.createElement("div")
    parentBox.className = "parent-box"
    let bottomContainer = document.createElement("div")
    bottomContainer.className = "bottomContainer"
    const left = document.createElement("div");
    left.className = "cn-movie-left";

    const img = document.createElement("img");
    img.className = "movie-left-img";
    img.src = `https://image.tmdb.org/t/p/original${item.poster_path}`;

    left.appendChild(img);

    const right = document.createElement("div");
    right.className = "cn-movie-right";

    /* navigation */
    const navigation = document.createElement("p");
    navigation.className = "navigation";
    navigation.textContent = `Home > Films > ${item.title}`;

    /* title */
    const title = document.createElement("h3");
    title.className = "movie-title";
    title.textContent = item.title;

    /* small title */
    const smallTitle = document.createElement("p");
    smallTitle.className = "movie-small-title";
    smallTitle.textContent = `${item.title} ${item.release_date.slice(0, 4)}`;

    /* diagrams buttons */
    const diagrams = document.createElement("div");
    diagrams.className = "diagrams";

    for (let i = 0; i < 3; i++) {
        const btn = document.createElement("button");
        btn.className = "diagram-btns";
        diagrams.appendChild(btn);
    }

    /* description */
    const description = document.createElement("p");
    description.className = "description";
    description.textContent = item.overview

    /* trailer button */
    const trailerBtn = document.createElement("button");
    trailerBtn.className = "trailer-btn";
    trailerBtn.textContent = "Watch Trailer";

    /* small data */
    const smallData = document.createElement("div");
    smallData.className = "small-data";

    const data = [
        "Premiere World: " + item.release_date,
        "Premiere US: " + item.release_date,
        "Time: " + item.runtime,
        "Slogan: " + item.tagline,
        "MPAA Rating: R",
        "Genre: " + item.genres.map(item => movieGenres[item.id] || "Unknown"),
        "Year: " + item.release_date.slice(0, 4),
        "Country: " + item.production_countries.map(item => item.name),
        "Production: Chris Hemsworth",
        "Camera: Erik Wilson",
        "Art: Scott Dougan",
        "Studios: Amazon MGM Studios"
    ];

    console.log(data);


    data.forEach(elem => {
        const p = document.createElement("p");
        p.className = "movie-parameters"
        // let span = p.nextElementSibling
        // span.textContent = elem
        p.textContent = elem;
        smallData.appendChild(p);
        // smallData.appendChild(span);
    });

    /* append right side */
    right.appendChild(navigation);
    right.appendChild(title);
    right.appendChild(smallTitle);
    right.appendChild(diagrams);
    right.appendChild(description);
    right.appendChild(trailerBtn);

    /* append all */
    parentBox.appendChild(left);
    parentBox.appendChild(right);
    bottomContainer.append(smallData)
    container.append(parentBox, bottomContainer)

    return container
}