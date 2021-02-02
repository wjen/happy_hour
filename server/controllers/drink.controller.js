const axios = require('axios');

exports.getVideos = async (req, res) => {
  console.log(req.query.name);
  if (req.query.name !== 'undefined') {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDwDwm3evrp8Nyc4TarKODrItP76HvJoFA=&type=video&part=snippet&maxResults=2&q=how+to+make+${req.query.name}+cocktail`
      );
      res.status(200).send(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  }
};
