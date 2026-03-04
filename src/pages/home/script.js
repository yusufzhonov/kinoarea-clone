import { Movie } from "../../components/Movie";
import { api } from "../../libs/api";
import { render } from "../../libs/render";
let  cardBox = document.querySelector(".card-box")
api.get("movie/popular")
    .then(res=>{
        console.log(res.data);
        render(Object.values(res.data.results), cardBox, Movie)
        console.log(Object.values(res.data.results));
        
    })
