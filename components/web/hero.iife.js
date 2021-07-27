(function () {
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="hero-img-container" class="hero-container">
      <img id="hero-img" />
    </div>
    <div id="hero-text-container" class="hero-container">
      <h1 class="title has-text-primary text-center"></h1>
    </div>

    <style>

      .hero-container {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        height: 20rem;
      }

      #hero-img-container {
        align-items: flex-end;
      }

      #hero-img {
        z-index: -100;
      }

      #hero-text-container {
        align-items: center;
      }

    </style>
  `;

  class Hero extends HTMLElement {
    constructor() { /* called when the class is instantiated */
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.heroImg = this.shadowRoot.querySelector('#hero-img');
    }

    connectedCallback() {
      /* Called when the element is connected to the page.
         This can be called multiple times during the element's lifecycle.
         e.g. when using drag and drop to move elements around */
      this.heroImg.src = this.getAttribute('img-src');
      this.heroImg.src = '/img/hero.jpg';
    }

    disconnectedCallback() {} // called when the element is disconnected

  }

  window.customElements.define('n-hero', Hero);

})();
