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