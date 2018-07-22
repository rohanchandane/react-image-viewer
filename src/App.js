import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      paginatedImages: [],
      paginationFirstCount: 0,
      paginationLastCount: 4
    };

    this.paginatePrevious = this.paginatePrevious.bind(this);
    this.paginateNext = this.paginateNext.bind(this);

  }

  componentDidMount() {
    axios.get(`http://jsonplaceholder.typicode.com/photos`)
    .then(res => {
      this.setState({ images: res.data });
      this.loadPaginatedImages(this.state.paginationFirstCount, this.state.paginationLastCount);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  loadPaginatedImages(first, last) {
    this.setState({
      paginationFirstCount: first,
      paginationLastCount: last,
      paginatedImages: this.state.images.slice(first, last)
    })
  }

  paginatePrevious() {
    if (this.state.paginationLastCount - 4 > 0) {
      let first = this.state.paginationFirstCount - 4;
      let last = this.state.paginationLastCount - 4;
      this.loadPaginatedImages(first, last);
    }
  }

  paginateNext() {
    if (this.state.paginationLastCount + 4 <= this.state.images.length) {
      let first = this.state.paginationFirstCount + 4;
      let last = this.state.paginationLastCount + 4;
      this.loadPaginatedImages(first, last);
    }
  }

  render() {
    return (
      <div className="App">
        
        <div className="image-viewer">
          {
            this.state.paginatedImages.map((image, index) => {
              return <div className="images" key={ index }>
                <span>{ image.title }</span>
                <img src={ image.thumbnailUrl } alt="thumbnail"/>
              </div>
            })
          }
      
        </div>

        <div className="pagination">
          <button onClick={ this.paginatePrevious } disabled={ this.state.paginationFirstCount <= 0 }> Older </button>
          <button onClick={ this.paginateNext }> Newer </button>
        </div>

      </div>
    );
  }
}

export default App;
