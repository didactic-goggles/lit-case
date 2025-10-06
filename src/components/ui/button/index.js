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
      transition: all 0.3s ease;
      color: var(--foreground-color);
    }

    :host {
      --border-color: transparent;
      --foreground-color: var(--primary);

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
      border: 2px solid var(--border-color);
      box-shadow: 0 1px 2px 0 #0000000d;
      position: relative;
      user-select: none;
    }

    :host([variant='solid']) {
      background-color: var(--background-color);
      color: var(--color);
    }

    :host([variant='solid']:hover) {
      background-color: var(--background-hover);
    }

    :host([variant='outline']) {
      color: var(--background-color);
    }

    :host([variant='outline']:hover) {
      background-color: var(--background-hover);
      color: var(--foreground-color);
    }

    :host([color='primary']) {
      --color: var(--primary-foreground);
      --border-color: var(--primary);
      --background-color: var(--primary);
      --foreground-color: var(--primary-foreground);
    }

    :host([color='primary']:hover) {
      background-color: var(--primary-hover);
    }

    :host([color='secondary']) {
      --color: var(--secondary-foreground);
      --border-color: var(--secondary);
      --background-color: var(--secondary);
      --foreground-color: var(--secondary-foreground);
    }

    :host([color='secondary']:hover) {
      background-color: var(--secondary-hover);
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
      flex-shrink: 0;
    }

    :host([variant='ghost']:hover) {
      background-color: var(--primary);
      color: var(--primary-foreground);
    }

    :host([disabled]) {
      --foreground-color: var(--muted) !important;
      opacity: 0.5;
      pointer-events: none;
    }

    :host([active]) {
      background-color: var(--primary);
      color: var(--primary-foreground);
      --foreground-color: var(--primary-foreground);
    }

    :host([variant='ghost'][size='icon']) {
      --foreground-color: var(--primary);
    }

    :host([variant='ghost'][size='icon']:hover) {
      --foreground-color: var(--primary-foreground);
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
    color: {type: String, attribute: 'color'},
    variant: {type: String, attribute: 'variant'},
    href: {type: String, attribute: 'href'},
    size: {type: String, attribute: 'size'},
    disabled: {type: Boolean, attribute: 'disabled'},
  };

  constructor() {
    super();
    this.type = 'button';
    this.loading = false;
    this.variant = 'solid';
    this.size = '';
  }

  render() {
    return html`
      <slot></slot>

      ${this.href ? html`<a href=${this.href}></a>` : html``}
    `;
  }
}

customElements.define('lit-button', LitButton);
