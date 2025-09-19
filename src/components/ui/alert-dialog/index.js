import {css, html, LitElement} from 'lit';
import '../dialog/index.js';
import '../button/index.js';
import { t } from '../../../utils/i18n.js';

export class LitAlertDialog extends LitElement {
  static styles = css`
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `;
  static properties = {
    title: {type: String, attribute: 'title'},
    message: {type: String, attribute: 'message'},
    open: {type: Boolean, attribute: 'open'},
    closeText: {type: String, attribute: 'close-text'},
    confirmText: {type: String, attribute: 'confirm-text'},
  };

  constructor() {
    super();
    this.closeText = this.closeText || t('components.ui.alertDialog.buttonCancel');
  }

  onClose() {
    this.dispatchEvent(new CustomEvent('close', {bubbles: true}));
  }

  onConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', {bubbles: true}));
  }

  render() {
    if (!this.open) return html``;

    return html`
      <lit-dialog ?open=${this.open} hide-header @close=${this.onClose}>
        <div slot="content">
          <div>${this.title}</div>

          <div>${this.message}</div>
        </div>

        <div slot="footer">
          <lit-button @click=${this.onClose} variant="secondary">${this.closeText}</lit-button>

          <lit-button @click=${this.onConfirm} variant="destructive">${this.confirmText}</lit-button>
        </div>
      </lit-dialog>
    `;
  }
}

customElements.define('lit-alert-dialog', LitAlertDialog);
