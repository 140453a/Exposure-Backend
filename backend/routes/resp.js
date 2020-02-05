const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const KEY = process.env.FLICKR_KEY;

router.get('/getPopular', async (req, res) => {
  try{
    let test = await fetch(`https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&format=json&nojsoncallback=1&api_key=${KEY}`,
    {method: "GET",
    headers: {}});
    const data = await test.json();
    Object.keys(data.photos.photo).forEach((item, i) => {
      console.log(data.photos.photo[i]); // each individual post.
    });

    res.send("200");
  }catch(err) {res.json({ message: err})}
  })


module.exports = router;

//TODO: Store every individual post above into the mongo DB.
