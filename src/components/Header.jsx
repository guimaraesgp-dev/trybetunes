import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userInfo: {},
  };

  async componentDidMount() {
    await this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({ userInfo });
  }

  render() {
    const { userInfo } = this.state;
    const { name } = userInfo;
    return (
      <div data-testid="header-component">
        { name ? (
          <p>Favoritos</p>
        ) : (
          <Loading />
        )}
        <h3 data-testid="header-user-name">{ name }</h3>
      </div>
    );
  }
}

export default Header;
