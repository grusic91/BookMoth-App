import React from "react";
import { withRouter } from 'react-router-dom';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
  }

  handleSearch() {
    const { history } = this.props;
    const title = this.searchInput.current.value;
    title ? history.push(`/books/${title}/books`) : history.push('/books');
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  render() {
    const {hideSearch} = this.props;
    return (
      <div className="form-inline my-2 my-lg-0"
        hidden={hideSearch()}
        >
        <input
          onKeyPress={(event) => {this.handleKeyPress(event)}}
          ref={this.searchInput}
          className="form-control mr-sm-2" type="search" placeholder="Search" />
        <button
          onClick={() => {this.handleSearch()}}
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit">Search</button>
      </div>
    )
  }
}

export default withRouter(SearchInput)
