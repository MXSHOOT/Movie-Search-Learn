class SearchBar extends HTMLElement {

  connectedCallback() {
    this.placeholder = this.getAttribute('placeholder') || "Input Anything"
    this.render();
  }

  render() {
    const element = document.createElement('input')
    element.type = 'text'
    element.placeholder = this.placeholder
    element.className = "search-bar"
    this.appendChild(element)
  }
}

customElements.define('search-bar', SearchBar)