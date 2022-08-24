import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class search extends Component {
  state = {
    valueInput: '',
    buttonDisabled: true,
    albums: [],
    artistName: '',
    loading: false,
  };

  validateButton = ({ target }) => {
    this.setState({
      valueInput: target.value,
    }, () => {
      const { valueInput } = this.state;
      const nomeTamanhoMinimo = 2;
      if (valueInput.length >= nomeTamanhoMinimo) {
        this.setState({
          buttonDisabled: false,
        });
      } else {
        this.setState({
          buttonDisabled: true,
        });
      }
    });
  }

  onClickButton = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { valueInput } = this.state;
    const searchAlbums = await searchAlbumsAPI(valueInput);
    this.setState({
      albums: searchAlbums,
      artistName: valueInput,
      valueInput: '',
      loading: false,
    });
  }

  render() {
    const { buttonDisabled, albums, loading, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.validateButton }
            />
            <button
              type="button"
              disabled={ buttonDisabled }
              data-testid="search-artist-button"
              onClick={ this.onClickButton }
            >
              Pesquisar
              {' '}

            </button>
            {albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
              <>
                <p>{`Resultado de álbuns de: ${artistName}`}</p>
                {albums.map((album) => (<AlbumCard
                  key={ album.collectionId }
                  album={ album }
                />))}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default search;
