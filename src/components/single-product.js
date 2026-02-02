import { renderMarkdown } from "../utils.js";

export default class SingleProduct extends HTMLElement {

    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });

    }
    // component attributes
    static get observedAttributes() {
        return ['product'];
    }

    get product() {
        const productAttr = this.getAttribute("product")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");

        return JSON.parse(productAttr);
    }

    productName() {
        console.log(this.product.name);
        return this.product.name;
    }
    // connect component
    connectedCallback() {
        //path to css realtive to html file (not this js file)
        this.innerHTML = `<h4 class="product-name">${this.product.name}</h4> 
                            <img src='${this.product.image_url}' alt='${this.product.name}' width='100' />
                            <div class='product-description'>${renderMarkdown(this.product.description)}</div>`;
        //this.shadowRoot.querySelector('.product-name').addEventListener('click', () => {
        //  console.log(`Product clicked: ${this.product.name}`);
        //});
    }
}