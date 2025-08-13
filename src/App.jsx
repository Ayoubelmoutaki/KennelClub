import React from 'react'
import DogHotelSite from "./DogHotelSite.jsx";

class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error){ return { hasError: true, error } }
  componentDidCatch(err, info){ console.error('[DogHotel] Runtime error:', err, info) }
  render(){
    if(this.state.hasError){
      return (
        <div style={{padding: 24, fontFamily: 'ui-sans-serif, system-ui', color: '#1f2937'}}>
          <h1 style={{fontSize: 24, marginBottom: 8}}>Something went wrong.</h1>
          <pre style={{whiteSpace: 'pre-wrap', background: '#fff7ed', border: '1px solid #fed7aa', padding: 12, borderRadius: 12}}>
            {String(this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <DogHotelSite />
    </ErrorBoundary>
  );
}
