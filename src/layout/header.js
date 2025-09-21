import {LitElement, css, html} from 'lit';
import {t, updateWhenLocaleChanges, localeManager} from '../utils/i18n.js';
import '../components/ui/button/index.js';
import '../components/language-switcher.js';
import '../components/ui/icon/index.js';

export class LitHeader extends LitElement {
  static styles = css`
    header {
      background-color: var(--header);
      color: var(--text);
      position: sticky;
      top: 0;
      z-index: 100;
      height: var(--header-height);
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;
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

    #header-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: var(--text);
    }

    #header-logo img {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
    }

    #header-logo span {
      font-size: 1.25rem;
      font-weight: 700;
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
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
      flex: 1;
    }

    nav a {
      color: var(--primary);
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: opacity 0.3s ease;
      opacity: 0.5;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    nav a:hover {
      opacity: 0.75;
    }

    nav a[data-state='active'] {
      opacity: 1;
    }

    lit-language-switcher {
      margin-left: auto;
    }
  `;

  static properties = {
    currentPath: {type: String},
  };

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

      this.closeMobileMenu();
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

  closeMobileMenu() {
    const mobileMenuToggle = this.shadowRoot.querySelector(
      '#mobile-menu-toggle'
    );

    if (mobileMenuToggle) {
      mobileMenuToggle.checked = false;
    }
  }

  render() {
    return html`
      <header>
        <a href="/" aria-label="ING Test Case" id="header-logo">
          <img
            src="public/assets/images/logo.png"
            alt="Logo"
            width="50"
            height="50"
          />

          <span>ING</span>
        </a>
        <label for="mobile-menu-toggle">
          <lit-icon name="menu" />

          <input type="checkbox" id="mobile-menu-toggle" />
        </label>

        <div class="menu-container">
          <nav>
            <a
              href="/"
              data-state=${this.currentPath === '/' ? 'active' : 'inactive'}
            >
              <lit-icon name="user"></lit-icon>
              ${t('layout.header.employees')}
            </a>
            <a
              href="/employees/create"
              data-state=${this.currentPath === '/employees/create'
                ? 'active'
                : 'inactive'}
            >
              <lit-icon name="plus"></lit-icon>
              ${t('layout.header.addNew')}
            </a>
          </nav>

          <lit-language-switcher></lit-language-switcher>
        </div>
      </header>
    `;
  }
}
customElements.define('lit-header', LitHeader);
