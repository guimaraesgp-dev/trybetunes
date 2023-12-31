import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class album extends Component {
  state = {
    infoAlbum: {},
    musicList: [],
    loading: false,
    songFavoriteId: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { musicList } = this.state;
    this.setState({ loading: true });
    const data = await getMusics(id);
    this.getFromFavorite();
    data.forEach((item, index) => {
      if (index === 0) {
        this.setState({ infoAlbum: item });
      } else {
        musicList.push(item);
      }
    });
    this.setState({ loading: false });
  }

  fetchToFavorite = async ({ target }, obj) => {
    const { songFavoriteId } = this.state;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(obj);
      this.setState({
        loading: false,
        songFavoriteId: [...songFavoriteId, obj.trackId],
      });
    } else {
      this.setState({ loading: true });
      await removeSong(obj);
      this.setState({
        loading: false,
        songFavoriteId: songFavoriteId.filter((id) => id !== obj.trackId),
      });
    }
  }

  getFromFavorite = async () => {
    const { songFavoriteId } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      songFavoriteId: [...songFavoriteId, ...result.map((music) => music.trackId)],
    });
  }

  render() {
    const { infoAlbum, musicList, loading, songFavoriteId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <p data-testid="album-name">{infoAlbum.collectionName}</p>
            <p data-testid="artist-name">{infoAlbum.artistName}</p>
            <section>
              {musicList.map((music) => (<MusicCard
                key={ music.trackId }
                music={ music }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                checked={ songFavoriteId.some((favSong) => music.trackId === favSong) }
                fetchToFavorite={ this.fetchToFavorite }
                songObj={ music }
              />))}
            </section>
          </div>
        )}
      </div>
    );
  }
}

album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
export default album;
