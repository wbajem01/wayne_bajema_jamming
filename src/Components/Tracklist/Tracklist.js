import React from 'react';
import './Tracklist.css';

import Track from '../Track/Track';

class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList">
      {
        // this.props.tracks.map(track => {
        // <Track id={track.id}
        //        album={track.album}
        //        artist={track.artist}
        //        title={track.title}
        //        onAdd={this.props.onAdd}
        //        onRemove={this.props.onRemove}
        //        isRemoval={this.props.isRemoval}
        //        key={track.id} />
        // })
      }
      </div>
    )
  }
}

export default TrackList;
