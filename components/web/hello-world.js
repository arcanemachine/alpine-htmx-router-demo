export function helloWorld() {
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="hello-world">Hello world!</div>
  `;

  class HelloWorld extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.helloWorldDiv = this.shadowRoot.querySelector('#hello-world');
    }

    // this can be called multiple times during the element's lifecycle.
    // e.g. when using drag and drop to move elements around
    connectedCallback() {
      if (!this.hasAttribute('color')) {
        this.setAttribute('color', 'red');
      }

      // apply attributes
      this.helloWorldDiv.style.color = this.getAttribute('color');

      // add listener
      this.helloWorldDiv.addEventListener('click', this.sayHello);

    }

    sayHello() {
      console.log('hello!');
    }

    disconnectedCallback() {
      // remove listener
      this.helloWorldDiv.removeEventListener('click', this.sayHello);
    }

  }

  window.customElements.define('hello-world', HelloWorld);

  /* <hello-world color="red"></hello-world>
     <hello-world color="green"></hello-world>
     <hello-world color="blue"></hello-world> */

}
