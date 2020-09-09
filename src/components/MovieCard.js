import './MovieDialog'
class MovieCard extends HTMLElement {
  set content(content) {
    this._content = content;
    this.render()
    this.addEventListener('click', () => {
      const dialog = document.createElement('movie-dialog')
      dialog.id = this._content.id
      const container = document.querySelector('.container')
      container.appendChild(dialog)
    })
  }
  // Awal Membuat Card Film
  render() {
    const content = this._content
    this.innerHTML = `
        <div class="card">
          <img
            src="https://image.tmdb.org/t/p/w200/${content.poster_path}"
            alt="${content.title} poster"
            class="movie_thumbnail"
          />
          <p class="rating">${parseFloat(content.vote_average).toFixed(1)}</p>
          <p class="title">${content.title}</p>
          <p class="release_date">${content.release_date}</p>
        </div>`
  }
  // Akhir Membuat Card Film
}

customElements.define('movie-card', MovieCard)