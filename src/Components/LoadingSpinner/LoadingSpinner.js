import React from 'react'
import { SpinnerOverlay, SpinnerContainer } from "./LoadingSpinner.Styles";

const LoadingSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer/>
      </SpinnerOverlay>
  ) : (
      <WrappedComponent {...otherProps} />
  )
}

export default LoadingSpinner