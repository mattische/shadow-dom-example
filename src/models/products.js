import { apiKey, baseURL } from "../utils.js"

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`);
        const result = await response.json();
        
        return result.data;
    }
};

export default products;