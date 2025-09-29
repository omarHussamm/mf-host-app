import { Component, ErrorInfo, ReactNode, Suspense } from 'react'

interface Props {
  children: ReactNode;
  remoteName: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Loading Component for Remote Apps
export const RemoteLoader = ({ appName }: { appName: string }) => (
  <div style={{ 
    padding: '40px', 
    textAlign: 'center',
    backgroundColor: '#f7fafc',
    border: '2px dashed #cbd5e0',
    borderRadius: '8px',
    margin: '20px 0'
  }}>
    <div style={{ 
      fontSize: '32px', 
      marginBottom: '15px',
      animation: 'spin 2s linear infinite'
    }}>
      ⏳
    </div>
    <p style={{ 
      color: '#4a5568', 
      margin: 0,
      fontSize: '16px',
      fontWeight: '500'
    }}>
      Loading {appName}...
    </p>
    <p style={{ 
      color: '#718096', 
      margin: '5px 0 0 0',
      fontSize: '14px'
    }}>
      Please wait while we fetch the micro frontend
    </p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export class RemoteErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`❌ Remote ${this.props.remoteName} failed to load:`, error, errorInfo);
    
    // In a real app, you might want to log this to an error reporting service
    console.group(`🔍 Error Details for ${this.props.remoteName}`);
    console.error('Error:', error.message);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  }

  private handleReload = () => {
    window.location.reload();
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '30px', 
          backgroundColor: '#fff5f5', 
          border: '2px solid #fed7d7',
          borderRadius: '12px',
          margin: '20px 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Error Icon and Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#e53e3e',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginRight: '15px'
            }}>
              ⚠️
            </div>
            <div>
              <h3 style={{ 
                color: '#c53030', 
                margin: '0 0 5px 0',
                fontSize: '20px',
                fontWeight: '600'
              }}>
                {this.props.remoteName} Unavailable
              </h3>
              <p style={{ 
                color: '#742a2a', 
                margin: 0,
                fontSize: '14px'
              }}>
                Micro frontend service failed to load
              </p>
            </div>
          </div>

          {/* Error Details */}
          <div style={{
            backgroundColor: '#fed7d7',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px',
            border: '1px solid #feb2b2'
          }}>
            <p style={{ 
              color: '#742a2a', 
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              <strong>What happened?</strong>
            </p>
            <p style={{ 
              color: '#742a2a', 
              margin: '0 0 10px 0',
              fontSize: '14px'
            }}>
              The {this.props.remoteName.toLowerCase()} micro frontend could not be loaded. 
              This could be due to:
            </p>
            <ul style={{ 
              color: '#742a2a',
              fontSize: '13px',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>Network connectivity issues</li>
              <li>The remote service being temporarily down</li>
              <li>Module federation configuration problems</li>
              <li>JavaScript execution errors in the remote app</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={this.handleRetry}
              style={{
                backgroundColor: '#e53e3e',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c53030'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e53e3e'}
            >
              🔄 Try Again
            </button>
            
            <button 
              onClick={this.handleReload}
              style={{
                backgroundColor: 'white',
                color: '#e53e3e',
                padding: '10px 20px',
                border: '2px solid #e53e3e',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e53e3e';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#e53e3e';
              }}
            >
              🔄 Reload Page
            </button>

            <button 
              onClick={() => window.history.back()}
              style={{
                backgroundColor: 'transparent',
                color: '#4a5568',
                padding: '10px 20px',
                border: '2px solid #cbd5e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Go Back
            </button>
          </div>

          {/* Technical Details (for development) */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '20px' }}>
              <summary style={{ 
                cursor: 'pointer', 
                color: '#744210',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                🔧 Technical Details (Development)
              </summary>
              <pre style={{
                backgroundColor: '#fdf6e3',
                padding: '10px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#744210',
                overflow: 'auto',
                marginTop: '10px',
                border: '1px solid #f7dc6f'
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return (
      <Suspense fallback={<RemoteLoader appName={this.props.remoteName} />}>
        {this.props.children}
      </Suspense>
    );
  }
}
