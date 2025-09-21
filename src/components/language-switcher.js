import {LitElement, html, css} from 'lit';
import {localeManager, updateWhenLocaleChanges} from '../utils/i18n';

export class LitLanguageSwitcher extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: relative;
    }

    img {
      width: 24px;
      height: 24px;
    }

    select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  `;

  options = [
    {value: 'tr', label: 'TR'},
    {value: 'en', label: 'EN'},
  ];

  constructor() {
    super();

    updateWhenLocaleChanges(this);
  }

  handleLocaleChange(event) {
    const locale = event.target.value;
    localeManager.setLocale(locale);
  }

  render() {
    return html` <img
        .src=${`../../public/assets/flags/${localeManager.getCurrentLocale()}.svg`}
        alt=${localeManager.getCurrentLocale()}
        width="24"
        height="24"
      />

      <select
        @change=${this.handleLocaleChange}
        .value=${localeManager.getCurrentLocale()}
      >
        ${this.options.map(
          (option) =>
            html`<option
              value=${option.value}
              ?selected=${option.value === localeManager.getCurrentLocale()}
            >
              ${option.label}
            </option>`
        )}
      </select>`;
  }
}

customElements.define('lit-language-switcher', LitLanguageSwitcher);
