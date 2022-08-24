import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <nav>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>

            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>

            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </nav>

        ) : (
          <Loading />
        )}
        <h3 data-testid="header-user-name">{ name }</h3>
      </div>
    );
  }
}

export default Header;
