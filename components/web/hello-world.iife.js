(function() {
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="hello-world">Hello world!</div>
  `;

  class HelloWorld extends HTMLElement {
    constructor() { /* called when the class is instantiated */
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.helloWorldDiv = this.shadowRoot.querySelector('#hello-world');
    }

    connectedCallback() {
      /* Called when the element is connected to the page.
         This can be called multiple times during the element's lifecycle.
         e.g. when using drag and drop to move elements around */
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

    disconnectedCallback() { // called when the element is disconnected
      // remove listener
      this.helloWorldDiv.removeEventListener('click', this.sayHello);
    }

  }

  window.customElements.define('hello-world', HelloWorld);

  /* <hello-world color="red"></hello-world>
     <hello-world color="green"></hello-world>
     <hello-world color="blue"></hello-world> */

})();
