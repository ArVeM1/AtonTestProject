import axios from "axios";

// Создаем путь к серверу
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "https://reqres.in/api",
});


instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
});

export default instance;