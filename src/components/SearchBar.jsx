import React from 'react'
import PropTypes from 'prop-types'

function SearchBar({ searchKeyword, setSearchKeyword }) {
  return (
    <div className="col-sm-10">
      <input
        className="form-control"
        type="text"
        placeholder="Search by first name, last name or email address"
        name="searchKeyword"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.currentTarget.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired
}

export default SearchBar

