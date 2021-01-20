import React from 'react';

function Cocktail({ id, name, image, ingredients, info, glass }) {
  console.log(ingredients);
  return (
    <div key={id} className="card">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div>
          {ingredients.map((ingredient, idx) => (
            <span key={idx} class="badge badge-pill card__badge">
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cocktail;
