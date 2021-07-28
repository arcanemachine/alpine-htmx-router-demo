/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

function indexComponent() {
  return {
    indexComponentShow: false,
    hasFooter: true,
    init() {
      this.indexComponentShow = true;
      this.$store.router.routeLoadCurrent();
    },
    introAnimationPlay() {
      /*
      let pageTitle = this.$refs.pageTitle;

      // set initial styles
      let pageTitleStyle = getComputedStyle(pageTitle);
      let pageTitleMarginTop = pageTitleStyle['marginTop'];
      let pageTitleHeight = pageTitleStyle['height'];
      pageTitle.style.marginTop =
        `calc(50vh - ${pageTitleMarginTop} - ${pageTitleHeight} - 5rem)`;
      pageTitle.classList.add('opacity-0');

      // add transition properties after setting default styles
      this.$nextTick(() => {
        pageTitle.style.transitionProperty = 'color, margin-top, opacity';
        pageTitle.style.transitionDuration = `${this.transitionDuration}ms`;
        tagline.style.transitionProperty = 'color';
        tagline.style.transitionDuration = `${this.transitionDuration}ms`;
        darkModeIcon.style.transitionProperty = 'right, bottom, opacity';
        darkModeIcon.style.transitionDuration = `${this.transitionDuration}ms`;
      });

      // perform animations
      Promise.resolve()
        .then(() => delay(750))
        // show title
        .then(() => { pageTitle.classList.remove('opacity-0'); })
        .then(() => { pageTitle.style.marginTop = ""; })
        .then(() => delay(1000))
        .then(() => { this.categorySelect('about'); })
        .then(() => { this.$refs.actionIconEmail.classList.add('wiggle'); })
        .then(() => delay(1000))
      */
      
      localStorage.setItem('introSeen', '1');
    },

  };
}

/* uncomment this section for unit testing, e.g. with Jest
try {
  // module.exports = indexComponent;
  // module.exports = { indexComponent, navbarMainComponent };
} catch {
  ; // eslint-disable-line
}
*/
