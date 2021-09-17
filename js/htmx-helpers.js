//* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

// if this page is fetched directly, redirect to the intended view
function htmxOnLoadRedirect(redirectTo = "") {
  window.addEventListener("load", () => {
    let getParams = ""; // getParams are empty by default
    let href = window.location.href;

    if (window.location.search) {
      getParams = window.location.search;
    } else if (href && href.split("?").length > 1) {
      // if working with URL hashes, getParams will be mixed in with the hash
      href = href.split("?")[0];
      getParams = href.split("?")[1];
    }
    if (window.location.pathname.slice(-5) === ".html") {
      let pageName;
      if (redirectTo) {
        pageName = redirectTo;
      } else {
        pageName = window.location.pathname.slice(0, -5);
      }
      let result = `/#${pageName}/` + getParams;
      window.location.replace(result);
    } else {
      window.location.replace = window.location.origin;
    }
  });
}

function htmxAddCsrfTokenToHeaders() {
  // add CSRFToken to HTMX headers
  document.body.addEventListener("htmx:configRequest", (event) => {
    event.detail.headers["X-CSRFToken"] = "{{ csrf_token|safe }}";
  });
}
