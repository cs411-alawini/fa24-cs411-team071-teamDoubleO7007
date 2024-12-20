import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3007/api';


export const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchCropData = (query) => {
    return httpClient
        .get(`/crops`, {
            params: { search: query },
        })
        .then((response) => response.data);
};


export const searchCityData = (query) => {
    return httpClient
        .get(`/city`, {
            params: { search: query },
        })
        .then((response) => response.data);
};

export const getGarden = () => {
    return httpClient
        .get(`/gardenEntryRoute`)
        .then((response) => response.data);
};


export const addGardenPlant = (newPlant) => {
    return httpClient
        .post(`/gardenEntryRoute`, newPlant)
        .then((response) => response.data);
};

export const deleteGardenPlant = (plantID) => {
    return httpClient
        .delete(`/gardenEntryRoute/${plantID}`)
        .then((response) => response.data);
};


export const getGardenProfits = () => {
    return httpClient
        .get(`/profit`)
        .then((response) => response.data);
};


export const getPlantProfit = (plantID) => {
    return httpClient
        .get(`/profit/${plantID}`)
        .then((response) => response.data);
};

export const updateGardenPlant = (plantID, vendor) => {
    return httpClient
        .put(`/gardenEntryRoute/${plantID}`, { vendor_Name: vendor })
        .then((response) => response.data);
};