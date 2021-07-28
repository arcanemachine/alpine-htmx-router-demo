export function card() {
  class Card extends HTMLElement {
    constructor() {
      super();
    }

    render() {
      let cardImgSrc;
      if (this.hasAttribute('img-src')) {
        cardImgSrc = this.getAttribute('img-src');
      } else {
        cardImgSrc = '/img/card-placeholder.png';
      }

      let cardTitle;
      if (this.hasAttribute('title')) {
        cardTitle = this.getAttribute('title');
      } else {
        cardTitle = '';
      }

      const cardTextSlot = this.querySelector('[slot="card-text"]');
      let cardText;
      if (cardTextSlot) {
        cardText = cardTextSlot.outerHTML;
      } else {
        cardText = `
          <div slot="card-text">
            Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros.
            Donec id elit non mi porta gravida at eget metus. Cum sociis
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
          </div>
        `;
      }

      this.innerHTML = `
        <div class="card large has-background-light">
          <header class="card-header">
            <div class="card-header-title is-centered">
              ${cardTitle}
            </div>
          </header>
          <div class="card-image">
            <figure class="image">
              <img class="card-img" src="${cardImgSrc}" />
            </figure>
          </div>
          <div class="card-content has-background-light">
            <div class="content">
              ${cardText}
            </div>
          </div>
        </div>
      `;

    }

    connectedCallback() {
      if (!this.rendered) {
        this.render();
      }

      // if card header title contains only whitespace, then remove it
      let cardHeader = this.querySelector('.card-header');
      if (!this.hasAttribute('title')) {
        cardHeader.remove();
      }
    }

    static get observedAttributes() {
      return ['img-src', 'title'];
    }

    attributeChangedCallback(name, oldValue, newValue) { // eslint-disable-line
      this.render();
    }

    // disconnectedCallback() {}

  }

  window.customElements.define('n-card', Card);

  /*
    <n-card title="Card Header Title"
            img-src="/your/img.jpg">
      <div slot="card-text" class="has-text-centered">
        <ul>
           <li>Your card text here</li>
        </ul>
      </div>
    </n-card>
  */
  
}
