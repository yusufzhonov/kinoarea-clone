import axios from "axios";
let accesToken = import.meta.env.VITE_ACCES_TOKEN

export const api = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Authorization: `Bearer ${accesToken}`
    }
})