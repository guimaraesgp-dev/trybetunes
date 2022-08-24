import React, { Component } from 'react';
import Header from '../components/Header';

class search extends Component {
  state = {
    valueInput: '',
    buttonDisabled: true,
  };

  validateButton = ({ target }) => {
    this.setState({
      valueInput: target.value,
    }, () => {
      const { valueInput } = this.state;
      const nomeTamanhoMinimo = 1;
      if (valueInput.length > nomeTamanhoMinimo) {
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

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.validateButton }
        />
        <button
          type="button"
          disabled={ buttonDisabled }
          data-testid="search-artist-button"
        >
          Pesquisar
          {' '}

        </button>
        SEARCH
      </div>
    );
  }
}

export default search;
