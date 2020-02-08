const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const helper = require('../api_helper.js')


router.get('/getPopular', async (req, res) => {
  let exif = await helper.savePopular();
  let exif_j = []
  for (var i = 0; i < exif.length; i++) {
    exif_j[i] = JSON.parse(exif[i])
}

  res.json(exif_j);

});



module.exports = router;

//TODO: Store every individual post above into the mongo DB.


// const express = require('express');
// const router = express.Router();
// const fetch = require('node-fetch');
// const helper = require('../api_helper.js')
// const KEY = process.env.FLICKR_KEY;
//
// router.get('/getPopular', async (req, res) => {
//   try{
//     let test = await fetch(`https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&format=json&nojsoncallback=1&api_key=${KEY}`,
//     {method: "GET",
//     headers: {}});
//     const data = await test.json();
//     Object.keys(data.photos.photo).forEach((item, i) => {
//       var photo = new Photo({
//         photoid: data.photos.photo[i].id,
//         owner: data.photos.photo[i].owner,
//         title: data.photos.photo[i].title
//       })
//
//         try{
//           savePhoto();
//         }catch(err) {res.json({ message: err})};
//       //console.log(data.photos.photo[i]); // each individual post.
//     });
//     res.send("200");
//
//   }catch(err) {res.json({ message: err})}
//   })
//
//
//
// module.exports = router;
//
// //TODO: Store every individual post above into the mongo DB.
