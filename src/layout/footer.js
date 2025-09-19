import {LitElement, html} from 'lit';

export class LitFooter extends LitElement {
  render() {
    return html`
      <footer>
        <h1>Footer</h1>
      </footer>
    `;
  }     
}
customElements.define('lit-footer', LitFooter);
