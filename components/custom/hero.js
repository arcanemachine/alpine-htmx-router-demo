export function hero() {
  class Hero extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      if (!this.rendered) {
        this.render();
      } 
    }

    render() {
      // attributes
      if (!this.hasAttribute('img-src')) {
        this.setAttribute('img-src', '/img/hero-default.jpg');
      }
      const heroImgSrc = this.getAttribute('img-src');

      // slots
      const heroTextSlot = this.querySelector('[slot="text"]');
      let heroText;
      if (heroTextSlot) {
        heroText = heroTextSlot.outerHTML;
      } else {
        heroText = `
          <div>Hero text</div>
        `;
      }

      this.innerHTML = `
        <div id="hero-container"
             class="hero-container">
          <div id="hero-img-container"
               class="hero-item-container">
            <img id="hero-img"
                 class="hero-img"
                 src="${heroImgSrc}" />
          </div>
          <div class="hero-item-container">
            ${heroText}
          </div>
        </div>

      `;
    }
    // disconnectedCallback() {}

  }

  window.customElements.define('n-hero', Hero);
}
