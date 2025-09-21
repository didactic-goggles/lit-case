import {LitElement, html, css} from 'lit';
import {t} from '../../utils/i18n.js';
import '../../components/ui/button/index.js';

export class NotFoundPage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }

    h1 {
      color: var(--primary);
    }
  `;

  render() {
    return html`
      <h1>${t('notFound.title')}</h1>

      <lit-button variant="primary" href="/"
        >${t('notFound.button')}</lit-button
      >
    `;
  }
}

customElements.define('lit-not-found-page', NotFoundPage);
