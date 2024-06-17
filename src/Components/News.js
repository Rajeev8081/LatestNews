import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
  };
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);

    this.state = { articles: [], loading: true, page: 1, totalResults: 0 };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- Latest news`;
  }

  async updatenews() { 
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedata = await data.json();
    this.props.setProgress(70);

    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
      
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updatenews();
  }

  // handleprevious = async () => {
  //   this.setState(
  //     (prevState) => ({ page: prevState.page - 1 }),
  //     this.updatenews
  //   );
  // };

  // handlenext = async () => {
  //   this.setState(
  //     (prevState) => ({ page: prevState.page + 1 }),
  //     this.updatenews
  //   );
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      const { country, category, pageSize } = this.props;
      const { page } = this.state;
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.apikey}&page=${page}&pageSize=${pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
      });
    });
  };

  render() {
    return ( 
    <>
            <h1 className="text-center" style={{padding: '100px 0px 90px 0px'}}>NEWS HEADLINES</h1>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
dataLength={this.state.articles ? this.state.articles.length : 0}
next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row"> 
          { this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 44) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageurl={element.urlToImage}
                    author={element.author ? element.author : "Unknow"}
                    date={element.publishedAt}
                    newsurl={element.url}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    );
  }
}

export default News;
