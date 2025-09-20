import {LitElement, html, css} from 'lit';

export class LitButton extends LitElement {
  static styles = css`
    ::slotted(*) {
      box-sizing: border-box;
      font-size: 0.875rem;
    }

    ::slotted(lit-icon) {
      width: 1rem;
      height: 1rem;
    }

    :host {
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      outline: none;
      height: 2.25rem;
      text-decoration: none;
      box-sizing: border-box;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      box-shadow: 0 1px 2px 0 #0000000d;
      position: relative;
      user-select: none;
    }

    :host([variant='primary']) {
      border-color: var(--primary);
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    :host([variant='primary']:hover) {
      background-color: var(--primary-hover);
    }

    :host([variant='secondary']) {
      border-color: var(--secondary);
      color: var(--secondary);
    }

    :host([variant='secondary']:hover) {
      background-color: var(--secondary-hover);
      color: var(--secondary-foreground);
    }

    :host([variant='destructive']) {
      border-color: var(--destructive);
      background-color: var(--destructive);
      color: var(--destructive-foreground);
    }

    :host([variant='destructive']:hover) {
      background-color: var(--destructive-hover);
    }

    :host([variant='ghost']) {
      background-color: transparent;
      color: var(--text);
      box-shadow: none;
    }

    :host([size='sm']) {
      height: 2rem;
    }

    :host([size='lg']) {
      height: 2.5rem;
      font-size: 1rem;
    }

    :host([size='icon']) {
      padding: 0.5rem;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 9999px;
    }

    :host([variant='ghost']:hover) {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    :host([active]) {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    a {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    ::slotted(.sr-only) {
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      position: absolute;
    }
  `;

  static properties = {
    type: {type: String, attribute: 'type'},
    loading: {type: Boolean, attribute: 'loading'},
    variant: {type: String, attribute: 'variant'},
    href: {type: String, attribute: 'href'},
    size: {type: String, attribute: 'size'},
    disabled: {type: Boolean, attribute: 'disabled'},
  };

  constructor() {
    super();
    this.type = 'button';
    this.loading = false;
    this.variant = 'primary';
    this.size = '';
  }

  render() {
    return html`
      <slot></slot>
      ${this.href ? html`<a href=${this.href}></a>` : ''}
    `;
  }
}

customElements.define('lit-button', LitButton);
