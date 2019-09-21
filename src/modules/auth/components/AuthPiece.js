/*
  eslint-disable
  no-underscore-dangle,
  camelcase,
  react/destructuring-assignment,
  react/sort-comp,
  react/prop-types,
  import/no-extraneous-dependencies
*/
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except
 *  in compliance with the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

import * as React from 'react'
// import { ConsoleLogger as Logger, I18n } from '@aws-amplify/core'
import { I18n } from '@aws-amplify/core'
// import Auth from '@aws-amplify/auth'
import AmplifyTheme from '../Amplify-UI/Amplify-UI-Theme'
// import countryDialCodes from './common/country-dial-codes.js';
import {
  FormField,
  Input,
  InputLabel,
//   SelectInput,
} from '../Amplify-UI/Amplify-UI-Components-React'
import { UsernameAttributes } from '../common/types.ts'
// import { PhoneField } from './PhoneField'
import { auth } from '../Amplify-UI/data-test-attributes'

const labelMap = {
  [UsernameAttributes.EMAIL]: 'Email',
  [UsernameAttributes.PHONE_NUMBER]: 'Phone Number',
  [UsernameAttributes.USERNAME]: 'Username',
}

export default class AuthPiece extends React.Component {
  constructor(props) {
    super(props)

    this.inputs = {}

    this._isHidden = true
    this._validAuthStates = []
    this.phone_number = ''
    this.loading = false
    this.changeState = this.changeState.bind(this)
    this.error = this.error.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.renderUsernameField = this.renderUsernameField.bind(this)
    this.getUsernameFromInput = this.getUsernameFromInput.bind(this)
    this.onPhoneNumberChanged = this.onPhoneNumberChanged.bind(this)
  }

  componentDidMount() {
    if (window && window.location && window.location.search) {
      if (!this.props.authData || !this.props.authData.username) { // eslint-disable-line
        const searchParams = new URLSearchParams(window.location.search)
        const username = searchParams ? searchParams.get('username') : undefined
        this.setState({ username })
      }
    }
  }

  onPhoneNumberChanged(phone_number) {
    this.phone_number = phone_number
  }

  getUsernameFromInput() {
    const { usernameAttributes = 'username' } = this.props // eslint-disable-line
    switch (usernameAttributes) {
      case UsernameAttributes.EMAIL:
        return this.inputs.email
      case UsernameAttributes.PHONE_NUMBER:
        return this.phone_number
      default:
        return this.inputs.username || this.state.username
    }
  }

  renderUsernameField(theme) {
    const { usernameAttributes = [] } = this.props
    if (usernameAttributes === UsernameAttributes.EMAIL) {
      return (
        <FormField theme={theme}>
          <InputLabel theme={theme}>
            {I18n.get('Email')}
            {' '}
*
          </InputLabel>
          <Input
            autoFocus
            placeholder={I18n.get('Enter your email')}
            theme={theme}
            key="email"
            name="email"
            onChange={this.handleInputChange}
            data-test={auth.genericAttrs.emailInput}
          />
        </FormField>
      )
    } if (usernameAttributes === UsernameAttributes.PHONE_NUMBER) {
      return (
        <div>phone field</div>
      /* <PhoneField theme={theme} onChangeText={this.onPhoneNumberChanged}/> */
      )
    }
    return (
      <FormField theme={theme}>
        <InputLabel theme={theme}>
          {I18n.get(this.getUsernameLabel())}
          {' '}
*
        </InputLabel>
        <Input
          defaultValue={this.state.username}
          autoFocus
          placeholder={I18n.get('Enter your username')}
          theme={theme}
          key="username"
          name="username"
          onChange={this.handleInputChange}
          data-test={auth.genericAttrs.usernameInput}
        />
      </FormField>
    )
  }

  getUsernameLabel() {
    const { usernameAttributes = UsernameAttributes.USERNAME } = this.props
    return labelMap[usernameAttributes] || usernameAttributes
  }

  // extract username from authData
  usernameFromAuthData() {
    const { authData } = this.props
    if (!authData) { return '' }

    let username = ''
    if (typeof authData === 'object') { // user object
      username = authData.user ? authData.user.username : authData.username
    } else {
      username = authData // username string
    }

    return username
  }

  errorMessage(err) { // eslint-disable-line
    if (typeof err === 'string') { return err }
    return err.message ? err.message : JSON.stringify(err)
  }

  triggerAuthEvent(event) {
    const state = this.props.authState
    if (this.props.onAuthEvent) { this.props.onAuthEvent(state, event) }
  }

  changeState(state, data) {
    if (this.props.onStateChange) { this.props.onStateChange(state, data) }

    this.triggerAuthEvent({
      type: 'stateChange',
      data: state,
    })
  }

  error(err) {
    this.triggerAuthEvent({
      type: 'error',
      data: this.errorMessage(err),
    })
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {}
    const {
      name, value, type, checked,
    } = evt.target
    const check_type = ['radio', 'checkbox'].includes(type)
    this.inputs[name] = check_type ? checked : value
    this.inputs.checkedValue = check_type ? value : null
  }

  render() {
    if (!this._validAuthStates.includes(this.props.authState)) {
      this._isHidden = true
      this.inputs = {}
      return null
    }

    if (this._isHidden) {
      this.inputs = {}
      const { track } = this.props
      if (track) track()
    }
    this._isHidden = false

    return this.showComponent(this.props.theme || AmplifyTheme)
  }

  showComponent(theme) { // eslint-disable-line
    // eslint-disable-next-line
    throw 'You must implement showComponent(theme) and don\'t forget to set this._validAuthStates.'
  }
}