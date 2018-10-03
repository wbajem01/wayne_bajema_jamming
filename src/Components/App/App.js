import React, { Component } from 'react';

import SearchBar from '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist from '../../Components/Playlist/Playlist';

import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { id: '4VqPOruhp5EdPBeR92t6lQ',
          album: 'The Resistance',
          artist: 'Muse',
          title: 'Uprising' },
        { id: '3lPr8ghNDBLc2uZovNyLs9',
          album: 'Black Holes And Revelations',
          artist: 'Muse',
          title: 'Supermassive Black Hole' },
        { id: '3skn2lauGk7Dx6bVIt5DVj',
          album: 'Black Holes',
          artist: 'Muse',
          title: 'Starlight' },
        { id: '4PrlkCGa3bBmU7QIboyxII',
          album: 'The Dark Side',
          artist: 'Muse',
          title: 'The Dark Side' },
        ],
      playlistName: 'Jamming',
      playListTracks: [
        { id: '4PrlkCGa3bBmU7QIboyxII',
          uri: ' ',
          album: 'The Dark Side',
          artist: 'Muse',
          title: 'The Dark Side'},
        { id: '3lPr8ghNDBLc2uZovNyLs9',
          uri: ' ',
          album: 'Black Holes And Revelations',
          artist: 'Muse',
          title: 'Supermassive Black Hole' },
      ],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        return;
    } else {
      this.setState({
          playListTracks: [...this.state.playListTracks, track]});
    }
  }

  removeTrack(track) {
    let newPlayListTracks = this.state.playListTracks.filter(track.id);
    this.setState({
        playListTracks: newPlayListTracks
    });
  }

  savePlayList() {
    Spotify.savePlayList();
    this.state.playlistName = 'New Playlist';
    this.state.playlistTracks = [];
  }

  search(term) {
    const results = Spotify.search(term);
    console.log(typeof(results));
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults tracks={this.state.SearchResults}
                           onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName}
                tracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlayList} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
