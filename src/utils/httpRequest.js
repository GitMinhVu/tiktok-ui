import axios from 'axios';

console.log(process.env);
// axious call add string
const httpRequest = axios.create({
    // baseURL: 'https://tiktok.fullstack.edu.vn/api/',
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export default httpRequest;
