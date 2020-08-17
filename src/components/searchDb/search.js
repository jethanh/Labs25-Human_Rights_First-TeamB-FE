import React, { useEffect, useRef } from 'react';

export default function Search({ searchValue, setSearchValue }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function handleChange(event) {
    setSearchValue(event.target.value);
  }
  console.log(searchValue);
  return (
    <div className="searchBar">
      <header>
        <input
          type="text"
          placeholder="Search.."
          value={searchValue}
          onChange={handleChange}
          ref={inputRef}
        />
      </header>
    </div>
  );
}
