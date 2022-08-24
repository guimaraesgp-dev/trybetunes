import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class editprofile extends Component {
  state = {
    loading: false,
    editName: '',
    editEmail: '',
    editDescription: '',
    editImage: '',
    isButtonDisabled: true,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      editName: user.name,
      editEmail: user.email,
      editDescription: user.description,
      editImage: user.image,
    });
  }

  onInputChange= ({ target }) => {
    this.setState({ [target.name]: target.value }, this.validateButton);
  }

  validateButton= () => {
    const validation = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { editName, editEmail,
      editDescription, editImage } = this.state;
    const validateInput = editName.length > 0
    && editEmail.length > 0
    && editDescription.length > 0
    && editImage.length > 0
    && validation.test(editEmail);
    if (validateInput) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  onButtonClick= async (event) => {
    event.preventDefault();
    const { history } = this.props;
    this.setState({ loading: true });
    const { editName, editEmail,
      editDescription, editImage } = this.state;
    const obj = {
      name: editName,
      email: editEmail,
      description: editDescription,
      image: editImage,
    };
    console.log(obj);
    await updateUser(obj);
    this.setState({ loading: false });
    history.push('/profile');
  }

  render() {
    const { loading, editName, editEmail,
      editDescription, editImage, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              name="editName"
              value={ editName }
              data-testid="edit-input-name"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="editEmail"
              value={ editEmail }
              data-testid="edit-input-email"
              onChange={ this.onInputChange }
            />
            <textarea
              name="editDescription"
              value={ editDescription }
              data-testid="edit-input-description"
              onChange={ this.onInputChange }
            />
            <input
              type="text"
              name="editImage"
              value={ editImage }
              data-testid="edit-input-image"
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isButtonDisabled }
              onClick={ this.onButtonClick }
            >
              {' '}
              Editar perfil
              {' '}

            </button>
          </form>
        )}
      </div>
    );
  }
}

editprofile.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default editprofile;
