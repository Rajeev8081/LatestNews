import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageurl
                ? "https://static.tnn.in/thumb/msid-110435245,thumbsize-839807,width-1280,height-720,resizemode-75/110435245.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} ... </h5>
            <p className="card-text">{description} ... </p>
            <p className="card-text">
              <small class="text-muted">
                by {author} on {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
