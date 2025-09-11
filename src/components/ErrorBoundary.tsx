import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
          <div className="retro-border p-8 bg-card max-w-2xl w-full text-center">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-red-600 font-['Press_Start_2P'] tracking-wider">
              SYSTEM ERROR!
            </h1>
            <div className="space-y-4 text-foreground">
              <p className="font-['Jersey_25'] text-lg md:text-xl leading-relaxed">
                Oops! Something went wrong in the matrix.
              </p>
              <p className="font-['Jersey_25'] text-base md:text-lg leading-relaxed text-muted-foreground">
                Don't worry, this happens even to the best developers.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="retro-border px-6 py-3 bg-green-600 text-white font-['Press_Start_2P'] text-sm tracking-wide hover:bg-green-700 transition-colors mt-6"
              >
                RESTART SYSTEM
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
