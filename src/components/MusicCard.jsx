import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music,
      previewUrl,
      trackId,
      fetchToFavorite,
      songObj,
      checked,
    } = this.props;
    return (
      <div>
        <p>{music.trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Musicas Favoritas
          <input
            type="checkbox"
            name="favoriteCheck"
            id="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked }
            onChange={ (e) => fetchToFavorite(e, songObj) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  fetchToFavorite: PropTypes.func.isRequired,
  songObj: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
};
export default MusicCard;
