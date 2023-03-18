import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {errorMsg: '', userId: '', userPin: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, userId: '', userPin: ''})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, userPin} = this.state

    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {
      user_id: userId,
      pin: userPin,
    }
    // console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserPin = event => {
    this.setState({userPin: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  render() {
    const {errorMsg, userId, userPin} = this.state

    const token = Cookie.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-img"
          />
          <form className="login-bg-container" onSubmit={this.onSubmitForm}>
            <h1 className="welcome-back-heading">Welcome Back!</h1>
            <div className="input-wrapper">
              <label htmlFor="userIdInput" className="user-id-label">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                placeholder="Enter User ID"
                id="userIdInput"
                className="user-input"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="userPinInput" className="user-id-label">
                PIN
              </label>
              <input
                type="password"
                value={userPin}
                placeholder="Enter PIN"
                id="userPinInput"
                className="user-input"
                onChange={this.onChangeUserPin}
              />
            </div>
            <button type="submit" className="btn-login">
              Login
            </button>
            <p className="error-msg ">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
