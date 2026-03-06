import axios from "axios";
let accesToken ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDExNmY3NmEwZWJjNTQ3NzE5ZTg1NmQ4NmQ5MmY5ZSIsIm5iZiI6MTcxNDgyMzc0MC41MTUsInN1YiI6IjY2MzYyMjNjNDcwZWFkMDEyMjEyM2UxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._dZgv2Hqi1IYYtLagRsb_8ELuqQz2_-Ov9-4VnqTTH8"

export const api = axios.create({
    baseURL:" https://api.themoviedb.org/3",
    headers:{
        Authorization: `Bearer ${accesToken}`
    }
})