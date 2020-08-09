import React, { Component } from 'react';
import axios from 'axios';
import './DisplayNews.css';



class Display extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      articles: []
    };
  }

  // Lifecycle method
  componentWillMount() {
    this.getArticles(this.props.search);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.getArticles(nextProps.search);
    }
  }



  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime = day + '/' + month + '/' + year + ' | ' + hour + ':' + (minute < 10 ? '0' + minute : minute);
    return composedTime;
  }

  getURL(search){
    //return the url based on the keyword
    const apiKey = process.env.REACT_APP_API_KEY;
    if(!search)
      return `http://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`; 
    else return `https://newsapi.org/v2/everything?q=${search}&language=en&apiKey=${apiKey}`;
  }

  getArticles(search) {
    // Make HTTP request with Axios
    
    console.log(search)
    let url = this.getURL(search);
    axios
      .get(url)
      .then(res => {
        const articles = res.data.articles;
        // Set state with result
        console.log(articles);
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="cardsContainer">
        {this.state.articles.map((news, i) => {
          return (
            <div className="card" key={i}>
              <div className="content">
                <h3>
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    {news.title}
                  </a>
                </h3>
                <p>{news.description}</p>
                <div className="author">
                  <p>
                    By <i>{news.author ? news.author : this.props.default}</i>
                  </p>
                  <p>{this.formatDate(news.publishedAt)}</p>
                </div>
              </div>
              <div className="image">
                <img src={news.urlToImage} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Display;
