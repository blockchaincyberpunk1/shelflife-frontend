import React, { Component } from 'react';

/**
 * ErrorBoundary Component
 * This component is designed to catch JavaScript errors anywhere in the component tree below it.
 * It logs those errors and provides a fallback UI to display to the user instead of crashing the app.
 *
 * It must be a class component because the `componentDidCatch` lifecycle method is only available in class components.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initialize state with no error
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * componentDidCatch - Lifecycle method invoked after an error has been thrown by a descendant component.
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - An object containing information about the component stack trace
   */
  componentDidCatch(error, errorInfo) {
    // Set the error state to true and store the error and errorInfo
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });

    // You can log the error to an error tracking service like Sentry here
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  /**
   * render - This method renders the component UI.
   * If an error has been caught, it displays a fallback UI.
   * If no error has occurred, it renders the child components normally.
   */
  render() {
    // Check if an error has occurred
    if (this.state.hasError) {
      // Fallback UI to display when an error occurs
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#fff', backgroundColor: '#494761' }}>
          <h1>Something went wrong.</h1> {/* Fallback error message */}
          <p>We apologize for the inconvenience.</p>
          {/* Optionally display the error message and component stack */}
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // If no error, render children components normally
    return this.props.children;
  }
}

export default ErrorBoundary;