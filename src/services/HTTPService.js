import axios from 'axios'
const baseURL = 'https://rickandmortyapi.com/api/';
const axiosInstance = axios.create({ baseURL });

export default HTTPService = {
    getData: async (target, query) => {
        try {
            let url = (query) ? `${target}/${query}` : `${target}`
            let resp = await axiosInstance.get(url)
            if (resp.status == 200) {
                return resp.data
            } else {
                return undefined
            }
        } catch (e) { console.log('@GET...error=', e.message) }
    },
    getAllData: async (target, query) => {
        try {
            let url = (query) ? `${target}?${query}` : `${target}`
            let resp = await axiosInstance.get(url)
            if (resp.status == 200) {
                return resp.data
            } else {
                return undefined
            }
        } catch (e) { console.log('@GETAll...error=', e.message) }
    },
}