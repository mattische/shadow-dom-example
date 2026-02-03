import { apiKey, baseURL } from "../utils.js";


export default class ProductList extends HTMLElement {
    constructor() {
        super();

        this.products = [];
    }

    // connect component
    async connectedCallback() {
        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`);
        const result = await response.json();

        this.products = result.data;
        console.log("product list");
        this.render();
    }

    render() {
        const list = this.products.map((product) => {
            const productJson = JSON.stringify(product).replace(/'/g, '&apos;').replace(/"/g, '&quot;');
            return `<div class='product-container'>
                            <single-product class='item' product='${productJson}'>
                            </single-product>
                    </div>`;
        }).join("");
        this.innerHTML = `<h2>PRODUKTER</h2>${list}`;
    }
}