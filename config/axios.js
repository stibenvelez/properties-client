import axios from "axios";

const clientAxios = axios.create({
    baseURL: `${import.meta.env.REACT_APP_API_URL}`,
});

export default clientAxios;
