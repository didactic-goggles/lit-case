import {LitElement, css, html} from 'lit';
import '../../components/employee-list.js';

export class LitHome extends LitElement {
  static styles = css``;
  render() {
    return html`
      <h1>Home</h1>

      <employee-list></employee-list>
    `;
  }
}
customElements.define('lit-home-page', LitHome);
