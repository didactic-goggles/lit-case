import {LitElement, html, css} from 'lit';

export class LitDialog extends LitElement {
  static properties = {
    open: {type: Boolean, attribute: 'open'},
    size: {type: String, attribute: 'size'},
    hideHeader: {type: Boolean, attribute: 'hide-header'},
  };

  static styles = css`
    dialog {
      position: relative;
      border: none;
      border-radius: 8px;
      padding: 0;
      width: 100%;
      max-height: 90vh;
    }

    dialog[size='sm'] {
      max-width: 400px;
    }

    dialog[size='md'] {
      max-width: 600px;
    }

    dialog[size='lg'] {
      max-width: 800px;
    }

    ::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .dialog-header h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      color: #6b7280;
    }

    .close-btn:hover {
      background-color: #f3f4f6;
      color: #374151;
    }

    .dialog-content {
      padding: 1.5rem;
    }

    .dialog-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }

    .dialog-footer ::slotted(div) {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      width: 100%;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.size = 'md';
    this.hideHeader = false;
    this.dialogElement = null;
  }

  firstUpdated() {
    this.dialogElement = this.shadowRoot.querySelector('dialog');
  }

  updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.dialogElement?.showModal();
      } else {
        this.dialogElement?.close();
      }
    }
  }

  onClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', {bubbles: true}));
  }

  onBackdropClick(event) {
    if (event.target === this.dialogElement) {
      this.onClose();
    }
  }

  render() {
    return html`
      <dialog
        aria-labelledby="dialog-title"
        @click=${this.onBackdropClick}
        @close=${this.onClose}
        size=${this.size}
      >
        ${!this.hideHeader ?
        html`
          <div class="dialog-header">
            <h3 id="dialog-title"><slot name="title"></slot></h3>
            <button class="close-btn" @click=${this.onClose}>×</button>
          </div>
        ` : html``}

        <div class="dialog-content">
          <slot name="content"></slot>
        </div>

        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }
}

customElements.define('lit-dialog', LitDialog);
