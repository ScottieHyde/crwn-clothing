import React from 'react'
import Spinner from "../Spinner/Spinner";

const LoadingSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
      <Spinner/>
  ) : (
      <WrappedComponent {...otherProps} />
  )
}

export default LoadingSpinner