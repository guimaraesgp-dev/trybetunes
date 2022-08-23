import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class login extends Component {
  state = {
    name: '',
    loading: false,
  };

  setName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  async triggerCreateUser() {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: false,
    });
    history.push('/search');
  }

  render() {
    const { name, loading } = this.state;
    const nomeTamanhoMaximo = 3;

    return (
      <div data-testid="page-login">
        {
          loading ? <Loading />
            : (
              <>
                <input
                  type="text"
                  data-testid="login-name-input"
                  value={ name }
                  onChange={ (e) => this.setName(e) }
                />
                <button
                  type="button"
                  disabled={ name.length < nomeTamanhoMaximo }
                  onClick={ () => this.triggerCreateUser() }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </>
            )
        }
      </div>
    );
  }
}

login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default login;
