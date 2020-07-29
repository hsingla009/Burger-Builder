import axios from 'axios'

const instance = axios.create({
    baseURL : "https://burger-builder-90fec.firebaseio.com"
})

export default instance