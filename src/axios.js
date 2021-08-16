import axios from "axios";

const base = axios.create({
  baseURL: "https://list-shared-todos.herokuapp.com", 
});

base.interceptors.request.use(function (config) {
    const access_token = localStorage.getItem('access_token');
    if(access_token) config.headers.Authorization =  'Bearer ' + access_token;
    return config;
}, function (error) {
    // Manejar el fallo de la solicitud
    return Promise.reject(error);
});

export default base; 