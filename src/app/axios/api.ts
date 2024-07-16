import axios from "axios";

const api = axios.create({
    baseURL: "https://fjinfor.ddns.net/fvendas/api",
});

export default api;