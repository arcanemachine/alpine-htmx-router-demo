export function buttonCta() {
  class ButtonCta extends HTMLElement {
    constructor() {
      super();
    }

    render() {
      let buttonImgSrc;
      if (this.hasAttribute('img-src')) {
        buttonImgSrc = this.getAttribute('img-src');
      } else {
        buttonImgSrc = '/img/telephone-fill.svg';
      }

      let buttonGlow;
      if (this.hasAttribute('glow')) {
        buttonGlow = this.getAttribute('glow');
      } else {
        buttonGlow = 'white';
      }

      let buttonHref;
      if (this.hasAttribute('href')) {
        buttonHref = this.getAttribute('href');
      } else {
        buttonHref = 'tel:12345';
      }

      let buttonText;
      if (this.hasAttribute('text')) {
        buttonText = this.getAttribute('text');
      } else {
        buttonText = 'CTA Button';
      }

      this.innerHTML = `
        <a class="button-cta button is-large is-info glow-${buttonGlow}"
           tabindex="0"
           href="${buttonHref}">
          <span class="pt-1 icon">
            <img class="button-cta-icon"
                 src="${buttonImgSrc}" />
          </span>
          <span class="button-cta-text is-size-4">
            ${buttonText}
          </span>
        </a>

        <style>
          .button-cta.button:focus { opacity: 1; }
          .button-cta.button:hover { opacity: 1; }
          .button-cta-icon { height: rem; }
        </style>
      `;

    }

    connectedCallback() {
      if (!this.rendered) {
        this.render();
      }
    }

    static get observedAttributes() {
      return ['img-src', 'href', 'text'];
    }

    attributeChangedCallback(name, oldValue, newValue) { // eslint-disable-line
      this.render();
    }

    // disconnectedCallback() {}

  }

  window.customElements.define('n-button-cta', ButtonCta);

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
