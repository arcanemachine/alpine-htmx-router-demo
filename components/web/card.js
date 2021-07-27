let htmlTemplate = `

<div class="card large">
  <header id="card-header"
          class="card-header has-background-light">
    <p id="card-header-title"
       class="mt-0 card-header-title is-size-4 is-centered"></p>
  </header>
  <div class="card-image">
    <figure class="image">
      <img id="card-img" />
    </figure>
  </div>
  <div class="card-content has-background-light">
    <div class="content">
      <slot name="card-text">
        Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros.
        Donec id elit non mi porta gravida at eget metus. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Cras mattis consectetur purus sit amet fermentum.
      </slot>
    </div>
  </div>
</div>

<style>
  @import '/css/bulma.min.css';
  @import '/css/bulma-custom.css';
  @import '/css/base.css';
</style>
`;

export function card() {
  const template = document.createElement('template');
  template.innerHTML = htmlTemplate;

  class Card extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.cardImg = this.shadowRoot.querySelector('#card-img');
      this.cardHeader = this.shadowRoot.querySelector('#card-header');
      this.cardHeaderTitle =
        this.shadowRoot.querySelector('#card-header-title');
    }

    connectedCallback() {
      if (!this.hasAttribute('img-src')) {
        this.setAttribute('img-src',
          'https://bulma.io/images/placeholders/480x320.png');
      }
      if (!this.hasAttribute('title')) {
        this.cardHeader.remove();
      }

      this.cardImg.src = this.getAttribute('img-src');
      this.cardHeaderTitle.textContent = this.getAttribute('title');
    }


    // connectedCallback() {}
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
