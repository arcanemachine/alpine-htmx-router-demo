//* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

function navbarComponent() {
  return {
    navbarIsActive: false,
    navbarShow: true,
    navbarItems: undefined,
    init() { this.navbarItems = this.$store.globals.navbarItems; } 
  }
}

/* uncomment this section for unit testing, e.g. with Jest
try {
  module.exports = navbarComponent;
} catch {
  ; // eslint-disable-line
}
*/
