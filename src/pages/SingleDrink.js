import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';

function SingleDrink() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [drink, setDrink] = useState('');
  const [youTubeVideoIds, setYouTubeVideoIds] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const fetchDrink = async () => {
      try {
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
          { timeout: 2000 }
        );
        if (response.data.drinks) {
          const {
            strDrink: name,
            strCategory: category,
            strDrinkThumb: image,
            strGlass: glass,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strInstructions: instructions,
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
          } = response.data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
          ];
          const measurements = [
            strMeasure1,
            strMeasure2,
            strMeasure3,
            strMeasure4,
            strMeasure5,
            strMeasure6,
          ];
          const newDrink = {
            name,
            category,
            image,
            glass,
            instructions,
            ingredients,
            measurements,
          };
          setIsLoading(false);
          setDrink(newDrink);
        } else {
          setDrink(null);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchDrink();
  }, [id]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log(drink.name);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=YT_API_KEY=&type=video&part=snippet&maxResults=3&q=how+to+make+${drink.name}+cocktail`
        );
        const videoIds = response.data.items.map((item) => item.id.videoId);
        setYouTubeVideoIds(videoIds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [drink]);

  if (isLoading) {
    return <Loading />;
  }
  if (!drink) {
    return <h3 className="text-center mt-4">No drink to display</h3>;
  } else {
    const {
      name,
      image,
      category,
      glass,
      instructions,
      ingredients,
      measurements,
    } = drink;

    return (
      <section className="details">
        <div className="container">
          <div className="row">
            <div className="details__img-container col-sm-6 col-md-6">
              <img src={image} alt={name} />
            </div>
            <div className="details__text col-sm-6 col-md-6">
              <p>
                <span className="badge badge-info p-2 mr-3 details__badge">
                  Name:
                </span>
                {name}
              </p>
              <p>
                <span className="badge badge-info p-2 mr-3 details__badge">
                  Category:
                </span>
                {category}
              </p>
              <p>
                <span className="badge badge-info p-2 mr-3 details__badge">
                  Glass:
                </span>
                {glass}
              </p>
              <p>
                <span className="badge badge-info p-2 mr-3 details__badge">
                  Instructions:
                </span>
                {instructions}
              </p>
              <div>
                <span className="badge badge-info p-2 mr-3 details__badge">
                  Ingredients List:
                </span>
                {ingredients.map((item, idx) => {
                  return item ? (
                    <>
                      <span key={idx} className="details__ingredients">
                        [{item} - {measurements[idx]}] &nbsp;
                      </span>
                    </>
                  ) : null;
                })}
              </div>
              <div>
                <h2 className="mt-3 details__subtitle">
                  "How To Make {name}" Instructional Videos
                </h2>
                <hr />
                {/* <div className="details__videos-container">
                  {youTubeVideoIds &&
                    youTubeVideoIds.map((videoId) => {
                      return (
                        <iframe
                          className="details__video"
                          key={videoId}
                          src={`http://www.youtube.com/embed/${videoId}`}
                          allowFullScreen
                        ></iframe>
                      );
                    })}
                </div> */}
              </div>

              <Link to="/" className="btn btn-primary mt-3">
                back home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SingleDrink;
