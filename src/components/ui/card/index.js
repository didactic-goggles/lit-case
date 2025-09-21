import {LitElement, html, css} from 'lit';

export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      background-color: var(--card);
      border-radius: 0.5rem;
      border: 1px solid var(--border);
      box-shadow: var(--card-shadow);
    }
  `;

  render() {
    return html`
      <slot name="header"></slot>

      <slot name="content"></slot>

      <slot name="footer"></slot>
    `;
  }
}

customElements.define('lit-card', LitCard);
