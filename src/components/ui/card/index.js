import {LitElement, html, css} from 'lit';

export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div class="card">
      <slot name="header"></slot>
      <slot name="content"></slot>
      <slot name="footer"></slot>
    </div>`;
  }
}

customElements.define('lit-card', LitCard);
