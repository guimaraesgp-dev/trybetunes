import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class profile extends Component {
  state = {
    infosUser: {},
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, infosUser: user });
  }

  render() {
    const { loading, infosUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <>
            <img
              src={ infosUser.image }
              alt={ infosUser.name }
              data-testid="profile-image"
            />
            <p>Nome</p>
            <p>{ infosUser.name }</p>
            <p>Email</p>
            <p>{ infosUser.email}</p>
            <p>Descrição</p>
            <p>{ infosUser.description}</p>
            <Link to="/profile/edit"> Editar perfil </Link>
          </>
        )}
      </div>
    );
  }
}

export default profile;
