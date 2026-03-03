import axios from "axios"

let accesToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzMwZTNkYWE4NGVjODlkODJlZDlmYWY5MWNmZjMwMiIsIm5iZiI6MTc3MjQ0MTQzNS4wMDQ5OTk5LCJzdWIiOiI2OWE1NGY1YWRlYzRhNzc5YWVkZTkzNDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.l3JjuKMp6G2EeCdyHvc3CXoOAaZ87iB8u_84Yloy-Ak"
export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${accesToken}` 
    }
})