import {LitElement, html, css} from 'lit';

export class LitCardGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<div class="card-grid">
      <slot></slot>
    </div>`;
  }
}

customElements.define('lit-card-grid', LitCardGrid);
