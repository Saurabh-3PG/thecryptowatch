import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.coinranking.com/v1/public'
});

export default instance;