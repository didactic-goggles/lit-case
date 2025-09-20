import {LitElement, html, css} from 'lit';
import './layout/header.js';
import './layout/main.js';
import './layout/footer.js';
import {localeManager} from './utils/i18n.js';
import './context/employee.js';

export class LitIndex extends LitElement {
  static styles = css`
    div {
      display: flex;
      flex-direction: column;
      min-height: 100svh;
    }
  `;
  constructor() {
    super();

    localeManager.init();
  }

  render() {
    return html`
      <employee-context-provider>
        <div>
          <lit-header></lit-header>

          <lit-main></lit-main>

          <lit-footer></lit-footer>
        </div>
      </employee-context-provider>
    `;
  }
}
customElements.define('lit-index', LitIndex);
