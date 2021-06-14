import React from 'react';
import { ErrorImageOverlay, ErrorImageText, ErrorImageContainer } from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    }
  }
  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true }
  }

  componentDidCatch(error, errorInfo) {
    // errorInfo contains the error info like maybe what component threw the error
    // log the error or send the error somewhere else
  }

  render() {
    if (this.state.hasErrored) {
      return (
          <ErrorImageContainer>
            <ErrorImageContainer imageUrl='https://i.imgur.com/oCkEbrA.png'/>
            <ErrorImageText>Sorry this page is broken</ErrorImageText>
          </ErrorImageContainer>
      )
    }
    return this.props.children
  }

}

export default ErrorBoundary;