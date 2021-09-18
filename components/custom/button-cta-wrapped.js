export function buttonCtaWrapped() {
  class ButtonCtaWrapped extends HTMLElement {
    constructor() {
      super();
    }

    render() {
      let buttonImgSrc;
      if (this.hasAttribute("img-src")) {
        buttonImgSrc = this.getAttribute("img-src");
      } else {
        buttonImgSrc = "/img/telephone-fill-white.svg";
      }

      let buttonGlow;
      if (this.hasAttribute("glow")) {
        buttonGlow = this.getAttribute("glow");
      } else {
        buttonGlow = "white";
      }

      let buttonHref;
      if (this.hasAttribute("href")) {
        buttonHref = this.getAttribute("href");
      } else {
        buttonHref = "tel:12345";
      }

      let buttonText;
      if (this.hasAttribute("text")) {
        buttonText = this.getAttribute("text");
      } else {
        buttonText = "CTA Button";
      }

      this.innerHTML = `
        <div class="w-max-20rem mt-10 mx-auto notification
                    has-background-primary has-text-centered has-text-light
                    border-r-1rem">
          <n-button-cta img-src="${buttonImgSrc}"
                        glow="${buttonGlow}"
                        href="${buttonHref}"
                        text="${buttonText}">
          </n-button-cta>
          <div class="mt-4 subtitle is-bold has-text-secondary">
            Call now!
          </div>
        </div>
      `;
    }

    connectedCallback() {
      if (!this.rendered) {
        this.render();
      }
    }

    static get observedAttributes() {
      return ["img-src", "href", "text"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // eslint-disable-line
      this.render();
    }

    // disconnectedCallback() {}
  }

  window.customElements.define("n-button-cta-wrapped", ButtonCtaWrapped);

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
