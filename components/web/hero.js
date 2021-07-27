let htmlTemplate = `
  <div id="hero-container">
    <div id="hero-img-container" class="hero-item-container">
      <img id="hero-img" />
    </div>
    <div class="hero-item-container">
      <slot name="text">Hero text</slot>
    </div>
  </div>

  <style>
    #hero-container {
      height: 20rem;
      width: 100vw;
    }

    .hero-item-container {
      position: absolute;
      height: 20rem;
      width: 100vw;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #hero-img {
      height: 20rem;
      width: 100vw;
      object-fit: cover;
      z-index: -1;
    }

</style>
`;

export function hero() {
  const template = document.createElement('template');
  template.innerHTML = htmlTemplate;

  class Hero extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.heroImg = this.shadowRoot.querySelector('#hero-img');
    }

    connectedCallback() {
      if (!this.hasAttribute('img-src')) {
        this.setAttribute('img-src', '/img/hero-default.jpg');
      }

      this.heroImg.src = this.getAttribute('img-src');
    }

    // disconnectedCallback() {}

  }

  window.customElements.define('n-hero', Hero);
}
