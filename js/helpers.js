//* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const helpers = {
  convertHyphenToCamel(s) {
    return s.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  },
  convertCamelToHyphen(s) {
    return s.replace(/([a-z][A-Z])/g, function (g) {
      return g[0] + "-" + g[1].toLowerCase();
    });
  },
  customElementPrefix: "n-",
  customElementImport(elementName) {
    // if element doesn't exist, try to import it
    if (!window.customElements.get("n-" + elementName)) {
      try {
        let elementNameCamelized = this.convertHyphenToCamel(elementName);
        eval(`nCustomElements().${elementNameCamelized}()`);
      } catch (e) {
        console.error(`Could not import '${elementName}'`);
      }
    }
  },
  customElementsImport(elements) {
    elements.forEach((element) => this.customElementImport(element));
  },
  webComponentImport(componentName) {
    // if element doesn't exist, try to import it
    if (!window.customElements.get("n-" + componentName)) {
      try {
        let componentNameCamelized = this.convertHyphenToCamel(componentName);
        eval(`nWebComponents().${componentNameCamelized}()`);
      } catch (e) {
        console.error(`Could not import '${componentName}'`);
      }
    }
  },
  webComponentsImport(components) {
    components.forEach((component) => this.webComponentImport(component));
  },
};
