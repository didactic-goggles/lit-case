import {LitElement, html} from 'lit';
import {localeManager} from '../utils/i18n';
import '../components/ui/select/index.js';

export class LitLanguageSwitcher extends LitElement {
  options = [
    {value: 'tr', label: 'TR'},
    {value: 'en', label: 'EN'},
  ];

  handleLocaleChange(event) {
    const locale = event.target.value;
    localeManager.setLocale(locale);
  }

  render() {
    return html`<lit-select
      @change=${this.handleLocaleChange}
      .value=${localeManager.getCurrentLocale()}
      .options=${this.options}
    >
    </lit-select>`;
  }
}

customElements.define('lit-language-switcher', LitLanguageSwitcher);
