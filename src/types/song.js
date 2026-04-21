export class Song {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.artist = data.artist;
    this.album = data.album;
    this.genre = data.genre;
    this.url = data.url;
  }
}