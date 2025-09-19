import {LitElement, css, html} from 'lit';
import '../../components/employee-list.js';

export class LitHome extends LitElement {
  static styles = css`
    h1 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
  `;
  render() {
    return html`
      <h1>Home</h1>

      <employee-list></employee-list>
    `;
  }
}
customElements.define('lit-home-page', LitHome);
