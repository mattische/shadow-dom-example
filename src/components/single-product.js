import { renderMarkdown } from "../utils.js";

export default class SingleProduct extends HTMLElement {

    constructor() {
        super()

        // this attaches a shadow DOM to the component (where it is used in the DOM)
        // mode: open - allows access to shadow DOM from outside the component
        this.attachShadow({ mode: 'open' })

        // mode: closed - prevents access to shadow DOM from outside the component.
        // We create a refenrece (_shadow) to the shadow DOM in the constructor, so we later
        // can refer to it using this._shadow.
        //this._shadow = this.attachShadow({ mode: 'closed' });

    }
    // component attributes
    static get observedAttributes() {
        return ['product'];
    }

    get product() {
        const productAttr = this.getAttribute("product")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");

        return JSON.parse(productAttr)
    }


    // connect component
    connectedCallback() {

        // shadowRoot:
        // mode: 'open', we can access shadow DOM from outside the component using element.shadowRoot
        // mode: 'closed', we cannot access shadow DOM from outside the component.
        // If 'closed' we would have to save an reference to the shadow DOM in the constructor.
        // Example: this._shadow = this.attachShadow({ mode: 'closed' });
        // Then we would use this._shadow instead of this.shadowRoot below.
        // CSS:
        // inline css is recommended for shadow DOM components.
        // If we used an external stylesheet, it would loaded for each component that is fetched from the server.
        // We could also add CSS with JavaScript via the CSSStyleSheet API (not supported in all browsers, yet).
        this.shadowRoot.innerHTML = `
                            <style>
                            .product-name { background: #e31c79; color: white; border-radius: 5px; padding: 10px; }
                            img { width: 20%; }
                            .product-description { font-size: 0.8rem; max-height: 0;
                                overflow: hidden;
                                transition: max-height 0.3s ease;
                            }
                            .product-description.show {
                                max-height: 500px;
                            }
                            .read { color: black; text-decoration: underline; cursor: pointer; }
                            </style>

                            <h4 class="product-name">${this.product.name}</h4> 
                            <img src='${this.product.image_url}' alt='${this.product.name}' width='100' />
                            <p class="read">Read description...</p>
                            <div class='product-description'>${renderMarkdown(this.product.description)}</div>`;
        this.shadowRoot.querySelector('.read').addEventListener('click', () => {
            this.shadowRoot.querySelector('.product-description').classList.toggle('show')
            console.log('clicked')
        });
    }
}