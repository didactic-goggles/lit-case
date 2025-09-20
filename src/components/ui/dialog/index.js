import {LitElement, html, css} from 'lit';

export class LitDialog extends LitElement {
  static properties = {
    open: {type: Boolean, attribute: 'open'},
    size: {type: String, attribute: 'size'},
    hideHeader: {type: Boolean, attribute: 'hide-header'},
  };

  static styles = css`
  :host {
    --close-btn-size: 32px;
    --padding-x: 1rem;
    --padding-y: 1rem;
  }

    dialog {
      position: relative;
      border: none;
      border-radius: 8px;
      padding: 0;
      width: 100%;
      max-height: 90vh;
      box-shadow: 0 10px 15px 3px rgba(0, 0, 0, 0.2);
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
      background: rgba(0, 0, 0, 0.3);
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--padding-y) var(--padding-x);
    }

    .dialog-header h2 {
      margin: 0;
      font-family: INGMeBold, arial, helvetica, sans-serif;
      font-weight: 700;
      color: var(--primary);
    }

    .close-btn {
      width: var(--close-btn-size);
      height: var(--close-btn-size);
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn lit-icon {
      width: var(--close-btn-size);
      height: var(--close-btn-size);
    }

    .close-btn:hover {
      color: var(--primary-hover);
    }

    .close-btn:focus {
      outline: 1px solid var(--primary);
    }

    .dialog-content {
      padding: var(--padding-y) var(--padding-x);
    }

    .dialog-footer {
      padding: var(--padding-y) var(--padding-x);
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
            <h2 id="dialog-title"><slot name="title"></slot></h2>
            <button class="close-btn" @click=${this.onClose}>
              <lit-icon name="x" size="32"></lit-icon>
            </button>
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
