import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if (this.props.isRemoval) {
      let action = `<a className="Track-action">'-' onClick={this.removeTrack}</a>`;
    } else {
      let action = `<a className="Track-action">'+' onClick={this.addTrack}</a>`;
    }
  }

  render() {
    this.renderAction();
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.title}</h3>
          <p>{this.props.artist} | {this.props.album}></p>
        </div>
          {this.action}
      </div>
    );
  }
}

export default Track;
