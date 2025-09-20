import {css, html, LitElement} from 'lit';
import '../dialog/index.js';
import '../button/index.js';
import {t} from '../../../utils/i18n.js';

export class LitAlertDialog extends LitElement {
  static styles = css`
    .message {
      font-size: 1.25rem;
      color: var(--muted);
    }

    .footer-buttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
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
    this.closeText =
      this.closeText || t('components.ui.alertDialog.buttonCancel');
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
      <lit-dialog ?open=${this.open} @close=${this.onClose}>
        <div slot="title">${this.title}</div>

        <div slot="content">
          <div class="message">${this.message}</div>
        </div>

        <div slot="footer">
          <div class="footer-buttons">
            <lit-button @click=${this.onConfirm} variant="primary" size="lg"
              >${this.confirmText}</lit-button
            >

            <lit-button @click=${this.onClose} variant="secondary" size="lg"
              >${this.closeText}</lit-button
            >
          </div>
        </div>
      </lit-dialog>
    `;
  }
}

customElements.define('lit-alert-dialog', LitAlertDialog);
