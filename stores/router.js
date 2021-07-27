/* eslint no-undef: 0 */

document.addEventListener('alpine:init', () => {
  Alpine.store('router', {
    hashParsed: undefined,
    elDefault: undefined,
    routeDefault: undefined,
    routeNotFound: undefined,
    routes: {},
    templateViewsDir: '/templates',
    transitionDuration: 250,

    init() {
      this.urlHashParsed = this.urlHashParse();

      this.routes = [
        {
          name: 'home',
          description: 'Home',
          pathname: this.pathnameBuildFromString('home'),
          url: this.urlBuildHashed('home'),
        }, {
          name: 'contactUs',
          description: 'Contact Us',
          pathname: this.pathnameBuildFromString('contact-us'),
          url: this.urlBuildHashed('contact-us'),
        }, {
          name: 'notFound',
          description: '404: Not Found',
          pathname: this.pathnameBuildFromString('404'),
          url: this.urlBuildHashed('404'),
        },
      ];

      this.elDefault = document.querySelector('#htmx-content-container');
      this.routeDefault = this.routes[0];
        // this.routes.filter((route) => route.name === 'intro')[0];
      this.routeNotFound = this.routes.slice(-1)[0];
        // this.routes.filter((route) => route.name === 'notFound')[0];

      // load htmx content whenever hash changes
      window.addEventListener('hashchange', () => {
        if (this.urlHashParsed !== this.urlHashParse()) {
          this.urlHashParsed = this.urlHashParse();
          this.routeLoadCurrent();
        }
      });
    },

    urlBuildHashed(name) {
      let result = '/#/';
      name = name.toLowerCase();
      if (name === '' || name === '/' || name === 'home') return result;
      return (`/#/${name.toLowerCase().replace(' ', '-')}/`);
    },

    // break apart a url hash into its component parts
    urlHashParse(hash=undefined) {
      if (!hash) {
        hash = window.location.hash;
      }

      hash = hash.split('?')[0]; // remove any GET parameters
      let splitHash = hash.split('/');

      if (hash === '') return false; // no hash
      if (hash === '#/') return false; // empty hash

      // ignore traditional hashes (e.g. '#about')
      if (splitHash[0].length > 1 && splitHash[0][0] === '#') return false;
      
      splitHash = splitHash.slice(1); // remove first value with plain hashtag

      if (splitHash.slice(-1)[0] === '') { // if last value is empty
        splitHash = splitHash.slice(0, -1); // remove last value
      }

      if (splitHash.length) {
        return splitHash;
      } else {
        return false; // if splitHash is empty, return false
      }
    },

    // given a value, generate the proper pathname
    pathnameBuildFromString(val, filetype=true) {
      val = val.toLowerCase().replace(' ', '-');
      let dir = this.templateViewsDir;
      return `${dir}/${val}${filetype ? '.html' : '/'}`;
    },

    pathnameBuildFromHash(hash=undefined, filetype=true) {
      if (!Array.isArray(hash) || !hash.length) {
        throw 'hash must be an array';
      } else {
        let result = this.templateViewsDir;
        hash.forEach((i, index) => {
          i = i.toLowerCase().replace(' ', '-');
          if (index !== hash.length -1) {
            result += '/' + i;
          } else {
            if (filetype === true) {
              result += '/' + i + '.html';
            } else {
              result += '/' + i + '/';
            }
          }
        });
        return result;
      }
    },

    // given the current hash, generate the proper url
    pathnameBuildFromCurrentHash() {
      let hash = this.urlHashParse(window.location.hash);
      let result = this.pathnameBuild(hash);
      return result;
    },

    pathnameBuild(val, filetype=true) {
      if (val == false || val === '' || val === '/' || val === '#/') {
        return this.routeDefault.pathname;
      }
      else if (typeof(val) === 'string') {
        return this.pathnameBuildFromString(val, filetype);
      }
      else if (Array.isArray(val)) {
        return this.pathnameBuildFromHash(val, filetype);
      } else {
        throw 'val must be string, array, or false';
      }
    },

    pathnameInRoutes(pathname) {
      if (this.routes.filter((route) => route.pathname === pathname).length) {
        return true;
      } else return false;
    },

    htmxGetContent(el=undefined, pathname=undefined) {
      if (!el) {
        el = document.querySelector('#htmx-content-container');
      }
      if (!pathname) {
        pathname = this.routeDefault.pathname;
      }

      pathname = pathname.toLowerCase();

      // smooth scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });

      el.classList.add('opacity-0');
      setTimeout(() => {
        htmx.ajax('GET', pathname, el);
        setTimeout(() => {
          el.classList.remove('opacity-0');
        }, this.transitionDuration);
      }, this.transitionDuration);
    },

    push(el, pathname) {
      if (this.pathnameInRoutes(pathname)) {
        this.htmxGetContent(el, pathname);
      } else {
        this.htmxGetContent(el, this.routeNotFound.pathname);
      }
    },

    routeLoadCurrent() {
      this.push(this.elDefault, this.pathnameBuildFromCurrentHash());
    },

    loadDefaultRoute() {
      this.push(this.elDefault, this.routeDefault.pathname);
    }

  });
});
