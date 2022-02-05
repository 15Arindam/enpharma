import axios from 'axios';

export const dbInst = axios.create({
    baseURL: process.env.REACT_APP_BACKEND
})
export const apiInst = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
export const assetInst = axios.create({
    baseURL: process.env.REACT_APP_ASSET_URL
})