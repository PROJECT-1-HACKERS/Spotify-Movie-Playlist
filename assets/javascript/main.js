class Movie {
  constructor() {
    this.trackInfo = []
    imdbAjax("john wick", (track) => this.trackInfo.push(track));
  }
}
