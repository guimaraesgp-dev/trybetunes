import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class album extends Component {
  state = {
    infoAlbum: {},
    musicList: [],
    loading: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { musicList } = this.state;
    this.setState({ loading: true });
    const data = await getMusics(id);
    data.forEach((item, index) => {
      if (index === 0) {
        this.setState({ infoAlbum: item });
      } else {
        musicList.push(item);
      }
    });
    this.setState({ loading: false });
  }

  render() {
    const { infoAlbum, musicList, loading } = this.state;
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
