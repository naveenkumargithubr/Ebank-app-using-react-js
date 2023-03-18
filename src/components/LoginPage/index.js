import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
  LoginBgContainer,
  LoginCardContainer,
  LoginLogo,
  LoginFormContainer,
  LoginBtn,
  ErrorMsg,
  InputLabel,
  InputField,
  LoginHeading,
  InputContainer,
} from './styledComponents'

class LoginPage extends Component {
  state = {
    userId: '',
    userPin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onChangeUserPin = event => {
    this.setState({
      userPin: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state
    const userDetails = {userId, userPin}
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdField = () => {
    const {userId} = this.state

    return (
      <>
        <InputLabel htmlFor="userId">User ID</InputLabel>
        <InputField
          type="text"
          value={userId}
          id="userId"
          placeholder="Enter User ID"
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  renderUserPinField = () => {
    const {userPin} = this.state

    return (
      <>
        <InputLabel htmlFor="userPin">PIN</InputLabel>
        <InputField
          type="password"
          value={userPin}
          id="userPin"
          placeholder="Enter PIN"
          onChange={this.onChangeUserPin}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginBgContainer>
        <LoginCardContainer>
          <LoginLogo
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <LoginFormContainer onSubmit={this.onSubmitForm}>
            <LoginHeading>Welcome Back!</LoginHeading>

            <InputContainer>{this.renderUserIdField()}</InputContainer>
            <InputContainer>{this.renderUserPinField()}</InputContainer>
            <LoginBtn type="submit">Login</LoginBtn>
            {showSubmitError && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </LoginFormContainer>
        </LoginCardContainer>
      </LoginBgContainer>
    )
  }
}

export default LoginPage
