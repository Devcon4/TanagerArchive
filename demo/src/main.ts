import { LitElement, html, customElement } from 'lit-element';
let md = ('./md/**/*');

@customElement('demo-app')
export class AppComponent extends LitElement {
    
    constructor() {
        super();
    }

    render() {
        return html`
        <div class="app"><h1>works!</h1></div>
        `;
    }
}

@customElement('demo-heading')
export class HeadingComponent extends LitElement {

    render() {
        return html`<h1>Blog post - <slot></slot></h1>`;
    }
}