import { LitElement, html } from 'lit-element';
import { MaterialIconsStyles } from './material-icons-styles';

class StarsRating extends LitElement {
  constructor() {
    super();
    this._stars = Array(5).fill('star_border');
    this.rate = 0;
    this.id = null;
    this.afterClick = null;
  }

  static get properties() {
    return {
      id: { type: String },
      rate: { type: Number },
      readOnly: { type: Boolean, value: false },
      afterClick: { type: Function, value: null}
    };
  }

  _handleCallback() {
    if (this.afterClick && typeof window[this.afterClick] === 'function') {
      window[this.afterClick]({
        id: this.id,
        rate: this.rate
      });
    }
  }

  _updateRate(e) {
    const id = parseInt(e.currentTarget.dataset.index);
    if (this._stars[id] === 'star') {
      this.rate = id;
    } else {
      this.rate = id + 1;
    }
    this._updateStars();
    this._handleCallback();
  }

  _updateStars() {
    const intPart = Math.floor(this.rate);
    const decimalPart = this.rate % 1;
    for (let i = 0; i < 5; i++) {
      this._stars[i] = 'star_border';
      if (i < intPart) {
        this._stars[i] = 'star';
      }
    }
    if (decimalPart >= 0.5) {
      this._stars[intPart] = 'star_half';
    }
  }
  
  render() {
    this._updateStars();

    return html`
      ${MaterialIconsStyles}
      <div
        data-rate="${this.rate}"
        class="stars-rating"
      >
        ${this._stars.map((star, index) => html`
          <i
            style="cursor:pointer; color:red;"
            class="material-icons"
            data-index="${index}"
            @click="${this._updateRate}"
          >
            ${star}
          </i>
        `)}
      </div>
    `;
  }
}

customElements.define('stars-rating', StarsRating);
