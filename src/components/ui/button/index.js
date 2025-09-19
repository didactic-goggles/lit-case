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
      border: 1px solid var(--border);
      box-shadow: 0 1px 2px 0 #0000000d;
      position: relative;
      user-select: none;
    }

    :host([variant='primary']) {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    :host([variant='primary']:hover) {
      background-color: var(--primary-hover);
    }

    :host([variant='secondary']) {
      background-color: var(--secondary);
      color: var(--secondary-foreground);
    }

    :host([variant='secondary']:hover) {
      background-color: var(--secondary-hover);
    }

    :host([variant='destructive']) {
      background-color: var(--destructive);
      color: var(--destructive-foreground);
    }

    :host([variant='destructive']:hover) {
      background-color: var(--destructive-hover);
    }

    :host([variant='text']) {
      background-color: transparent;
      color: var(--text);
    }

    :host([variant='text']:hover) {
      background-color: var(--accent);
      color: var(--primary-foreground);
    }

    :host([variant='input']) {
      background-color: var(--input-bg);
      border: 1px solid var(--border);
      color: var(--text);
    }

    :host([variant='input']:focus) {
      box-shadow: var(--input-focus-box-shadow);
    }

    :host([variant='input']:hover) {
      background-color: var(--input-hover);
    }

    :host([size='sm']) {
      height: 2rem;
    }

    :host([size='lg']) {
      height: 2.5rem;
    }

    a {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

  static properties = {
    type: {type: String, attribute: 'type'},
    loading: {type: Boolean, attribute: 'loading'},
    variant: {type: String, attribute: 'variant'},
    href: {type: String, attribute: 'href'},
    size: {type: String, attribute: 'size'},
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
