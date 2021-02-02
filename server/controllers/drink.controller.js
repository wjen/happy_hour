const axios = require('axios');
require('dotenv').config();

// Grab videos from youtube api with query name and return results
exports.getVideos = async (req, res) => {
  if (req.query.name !== 'undefined') {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_API_KEY}=&type=video&part=snippet&maxResults=2&q=how+to+make+${req.query.name}+cocktail`
      );
      res.status(200).send(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
    }
  }
};
