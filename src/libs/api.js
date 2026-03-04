import axios from "axios";
let accesToken ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWFiMDYzOTQ4ZDU1ZmViNGJiODVhYjE0ZTQ3Zjg0OSIsIm5iZiI6MTc3MjQ0MDc4Ni45MjMsInN1YiI6IjY5YTU0Y2QyOWE3Y2RiN2JlN2MxN2M4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F-fnFwL_uhSA_LTLHP1xOvOmZPd7e3dZS6JqO0CNv1c"

export const api = axios.create({
    baseURL:" https://api.themoviedb.org/3",
    headers:{
        Authorization: `Bearer ${accesToken}`
    }
})