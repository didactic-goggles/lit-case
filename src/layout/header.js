import {LitElement, css, html} from 'lit';
import {t, updateWhenLocaleChanges, localeManager} from '../utils/i18n.js';
import '../components/ui/button/index.js';
import '../components/language-switcher.js';

export class LitHeader extends LitElement {
  static properties = {
    currentPath: {type: String},
  };
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

    header {
      background-color: var(--background);
      color: var(--text);
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      width: 100%;
      gap: 1rem;
      height: 4rem;
    }

    label {
      display: none;
    }

    label input {
      display: none;
    }

    @media (max-width: 768px) {
      label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: auto;
      }

      header:has(input:checked) .menu-container {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        height: calc(100vh - 4rem);
        width: 100vw;
        top: 100%;
        left: 0;
        background-color: var(--background);
        z-index: 100;
      }

      .menu-container {
        display: none !important;
      }

      nav {
        flex-direction: column;
        flex: 0 !important;
      }

      lit-language-switcher {
        margin-right: auto;
      }
    }

    .menu-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    nav a {
      color: var(--primary);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
    }

    nav a:hover {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    nav a[data-state='active'] {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    lit-language-switcher {
      margin-left: auto;
    }
  `;

  constructor() {
    super();
    this.currentPath = window.location.pathname;
    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupRouterListener();
  }

  setupRouterListener() {
    this.handleLocationChange = (event) => {
      this.currentPath = event.detail.location.pathname;
    };

    window.addEventListener(
      'vaadin-router-location-changed',
      this.handleLocationChange
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener(
      'vaadin-router-location-changed',
      this.handleLocationChange
    );
  }

  handleLocaleChange(event) {
    const locale = event.target.value;
    localeManager.setLocale(locale);
  }

  render() {
    return html`
      <header class="container">
        <a href="/">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="24" stroke="gray" stroke-width="2" />
          </svg>
        </a>
        <label for="mobile-menu-toggle">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="gray"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <input type="checkbox" id="mobile-menu-toggle" />
        </label>

        <div class="menu-container">
          <nav>
            <a
              href="/"
              data-state=${this.currentPath === '/' ? 'active' : 'inactive'}
              >${t('header.home')}</a
            >
            <a
              href="/employees"
              data-state=${this.currentPath === '/employees'
                ? 'active'
                : 'inactive'}
              >${t('header.employees')}</a
            >
          </nav>

          <lit-language-switcher></lit-language-switcher>
        </div>
      </header>
    `;
  }
}
customElements.define('lit-header', LitHeader);
