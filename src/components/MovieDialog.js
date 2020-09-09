import api from "../provider/tmdb";

class MovieDialog extends HTMLElement {
  async renderDetail(id) {
    this.renderLoading();
    const res = await api.list(`/movie/${id}`);
    this._content = res;
    this.render();
    const closeButton = this.querySelector(".close");
    closeButton.addEventListener("click", () => {
      this.remove();
    });
    document.addEventListener("keypress", (e) => console.log(e.keyCode));
  }
  set id(id) {
    this.renderDetail(id);
  }

  generateLayout(content) {
    return `
    <div class="wrapper">
        <div class="close">X</div>
          <div class="content">
          ${content}
          </div>
        </div>
    </div>
    `;
  }

  renderLoading() {
    this.innerHTML = this.generateLayout('<div class="loading">Loading...</div>');
  }
  // Awal pembentukan isi film
  render() {
    const content = this._content;
    this.innerHTML = this.generateLayout(`
    <div class="left fadeIn">
      <img src="https://image.tmdb.org/t/p/w500/${content.poster_path}" alt="">
    </div>
    <div class="right fadeIn">
      <div class=header>
        <h1>${content.title}</h1>
        <p>${content.tagline}</p>
      </div>
      <h3>Genres</h3>
      <div class="genre-container">
        ${content.genres
          .map((genre) => `<span class="genre">${genre.name}</span>`)
          .toString()
          .replace(/,/g, "")}
      </div>
      <h3>Rating</h3>
      <p>${content.vote_average} (${content.vote_count} Votes)</p>
      <h3>Release Date</h3>
      <p>${content.release_date}</p>
      <h3>Official Homepage</h3>
      <a href="${content.homepage}" target="_blank">${content.homepage}</a>
      <h3>Overview</h3>
      <p>${content.overview}</p>
      ${
        content.production_companies.length
          ? `<h3>Production Companies</h3>
        <div class="company-container">
            ${content.production_companies
              .map(
                (company) =>
                  `<img class="company" src="https://image.tmdb.org/t/p/w200/${company.logo_path}">`
              )
              .toString()
              .replace(/,/g, "")}
        </div>`
          : ""
      }
    </div>
`);
  }
  // Akhir Pembentukan isi film
}

customElements.define("movie-dialog", MovieDialog);
