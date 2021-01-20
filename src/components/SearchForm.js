import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';

function SearchForm() {
  const { name, setName } = useGlobalContext();
  const searchValue = useRef('');

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleNameChange = () => {
    setName(searchValue.current.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="col-md-6 container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form__label">
            Search your favorite cocktail
          </label>
          <input
            type="text"
            className="form-control form__input"
            id="name"
            name="name"
            aria-describedby="Search term"
            placeholder="e.g. whiskey ginger"
            onChange={handleNameChange}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
