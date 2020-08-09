import React, { Component } from 'react';
import './NewsClient.css';
import DisplayNews from './DisplayNews.js';

class NewsClient extends Component {
    constructor(props) {
      // Pass props to parent class
      super(props);
      // Set initial state
      this.state = {
        value: ''
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        console.log(this.state.value);
    }

    render() {
        return (
          <div className="newsContainer">
            <div className="searchContainer">
              Filter By Keyword:  <input type="text" placeholder="keyword" onChange={this.handleChange} />
            </div>
            <DisplayNews search={this.state.value} />
          </div>
        );
      }
}

export default NewsClient;

