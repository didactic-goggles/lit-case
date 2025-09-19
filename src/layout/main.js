import {LitElement, css, html} from 'lit';
import {initRouter} from '../router/index.js';

export class LitMain extends LitElement {
  static styles = css`
    .container {
      width: 100%;
      margin: 0 auto;
      padding: 0 1rem;
      max-width: calc(100vw - 2rem);
    }

    @media (min-width: 1200px) {
      .container {
        max-width: 1140px;
      }
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector('#outlet');
    initRouter(outlet);
  }

  render() {
    return html`
      <main class="container">
        <div id="outlet"></div>
      </main>
    `;
  }
}
customElements.define('lit-main', LitMain);
