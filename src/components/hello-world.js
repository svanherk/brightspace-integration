import {LitElement, html} from '@polymer/lit-element';

class LitHelloWorld extends LitElement {

  render() {
    return html`<span>Lit Hello World</span>`;
  }

}
customElements.define('lit-hello-world', LitHelloWorld);
