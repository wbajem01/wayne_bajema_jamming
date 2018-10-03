import React from 'react';

import './Playlist.css';

import TrackList from '../Tracklist/Tracklist';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onClick={this.handleNameChange}
                                             onChange={this.handleNameChange} />
        <TrackList tracks={this.props.tracks}
                   onRemove={this.props.onRemove}
                   isRemoval={true}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
