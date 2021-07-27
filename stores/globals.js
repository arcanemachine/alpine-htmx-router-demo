/* eslint no-undef: 0 */

document.addEventListener('alpine:init', () => {
  Alpine.store('globals', {
    // defaultPage: 'about.html',
    navbarItems: [ 'Home', 'Contact Us' ],
    transitionDuration: 250,

    colorTextPrimary: '#2e7d71',
    colorTextLight: '#eee',
    colorTextDark: '#363636',
    colorTextSecondary: '#00d1b2',

    // company info
    companyName: "Steele Electric",
    companySlogan: "Put a little spark into your life.",

    urlFacebook: '',
    urlInstagram: '',
    urlLinkedIn: '',
    urlPinterest: '',
    urlTwitter: '',
    urlYouTube: '',

    address1: '123 Fake St.',
    address2: '',
    city: 'Fakeville',
    state: 'AB',
    country: 'Canada',
    zipCode: 'T8V 1A1',

    emailUsername: 'your-email',
    emailDomain: 'your-domain.com',
    email: `${this.emailUsername}@${this.emailDomain}`,

    phoneUnformatted: ('1' + '780' + '555' + '1234'),
    phoneFormatted: '(780) 555-1234',

    contactLinkGet(type) {
      if (type === 'email') {
        return `mailto:${this.email}`;
      }
      else if (type === 'phone') {
        return `tel:${this.phoneUnformatted}`;
      } else {
        console.error('contactLinkGet(): Unrecognized contact type');
        return false;
      }
    },
  });
});
