import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

export default class App extends Component {
  state = {
    progress: 0,
    backgroundClass: '', // State to manage background image class
  };

  apikey = `86e317d0e57e440cbcb1b8781434cc0d`;

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  setBackgroundClass = () => {
    const { pathname } = window.location;

    let backgroundClass = '';

    switch (pathname) {
      case '/business':
        backgroundClass = 'background-business';
        break;
        case '/':
        backgroundClass = 'background-sports';
        break;
      case '/entertainment':
        backgroundClass = 'background-entertainment';
        break;
      case '/general':
        backgroundClass = 'background-general';
        break;
      case '/health':
        backgroundClass = 'background-health';
        break;
      case '/science':
        backgroundClass = 'background-science';
        break;
      case '/sports':
        backgroundClass = 'background-sports';
        break;
      case '/technology':
        backgroundClass = 'background-technology';
        break;
      default:
        backgroundClass = '';
        break;
    }

    this.setState({ backgroundClass });
  };

  componentDidMount() {
    this.setBackgroundClass(); // Initial background class setup

    // Add listener to update background class on route change
    window.addEventListener('popstate', this.setBackgroundClass);
  }

  // Remove listener when component unmounts to prevent memory leaks
  componentWillUnmount() {
    window.removeEventListener('popstate', this.setBackgroundClass);
  }

  render() {
    return (
      <div className={`app-container ${this.state.backgroundClass}`}>
        <Router>
          <LoadingBar color="#f11946" progress={this.state.progress} />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" category="general" />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" category="business" />}
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" category="entertainment" />
              }
            />
            <Route
              path="/general"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" category="general" />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" category="health" />}
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" category="science" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" category="sports" />}
            />
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress} apikey={this.apikey} key="technology" category="technology" />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
