import {LitElement, html, css} from 'lit';
import {t} from '../utils/i18n.js';

export class LitFooter extends LitElement {
  static styles = css`
    footer {
      background-color: var(--footer);
      color: var(--text);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    hr {
      border: 1px solid var(--border);
      width: 100%;
      margin: 0;
    }

    #footer-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: var(--text);
    }

    #footer-logo img {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
    }

    #footer-logo span {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .footer-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 0.875rem;
    }

    .footer-bottom {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer-bottom p {
      font-size: 0.875rem;
      font-weight: 400;
      margin: 0;
      color: var(--muted);
      text-align: center;
    }
  `;

  render() {
    return html`
      <footer>
        <div class="footer-top">
          <a href="/" aria-label="ING Test Case" id="footer-logo">
            <img
              src="public/assets/images/logo.png"
              alt="Logo"
              width="50"
              height="50"
            />

            <span>ING</span>
          </a>

          <div>${t('layout.footer.message')}</div>
        </div>

        <hr />

        <div class="footer-bottom">
          <p>2025</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('lit-footer', LitFooter);
