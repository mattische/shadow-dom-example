export default class ProductsView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML = `<header class="header">
                                <lager-title title="Lista"></lager-title>
                             </header>
                             <main class="container">
                                <product-list></product-list>
                             </main>
                             `;
    }
}