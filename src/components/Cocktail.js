import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cocktail({ id, name, image, ingredients, info, glass }) {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      key={id}
      className="card"
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div
        className={
          showOverlay ? 'card-img-overlay show-modal' : 'card-img-overlay'
        }
      >
        <div className="card__modal">
          <Link
            to={`/drink/${id}`}
            className="btn btn-outline-primary btn-lg card__modal__buttons"
          >
            Details
          </Link>
          <button className="btn btn-outline-info btn-lg card__modal__buttons">
            Add to Favorites
          </button>
        </div>
      </div>

      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div>
          {ingredients.map((ingredient, idx) => (
            <span key={idx} className="badge badge-pill card__badge">
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cocktail;
