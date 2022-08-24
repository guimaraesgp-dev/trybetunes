import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <p>{ album.collectionName }</p>
        <p>{ album.artistName }</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          Mais Detales

        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
  }).isRequired,
};
export default AlbumCard;
