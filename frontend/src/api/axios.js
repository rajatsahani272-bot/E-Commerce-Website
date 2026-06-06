import axios from 'axios';


const api =axios.create({
    baseURL:'https://e-commerce-website-75gq.onrender.com/api',
})

export default api;