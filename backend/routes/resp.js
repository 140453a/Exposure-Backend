const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const helper = require('../api_helper.js')
const Photo = require('../models/Photo');


router.get('/getPopular', async (req, res) => {
  let dataexif = await helper.savePopular();
  let exif_j = []
  for (var i = 0; i < dataexif[1].length; i++) {
    temp = JSON.parse(dataexif[1][i]);
    // Checking if picture api call went through
    if(temp.stat == "fail"){
        continue;
    }
    // checking if exif data is exposed
    else if {}
    // checking if camera is in manual mode

    // checking if lens length is 50 mm

    // Check complete, adding all information
    exif_j[i] = temp;
    exif_j[i].MyId = dataexif[0].photos.photo[i].id;
    exif_j[i].MyOwner = dataexif[0].photos.photo[i].owner;
    exif_j[i].MyTitle = dataexif[0].photos.photo[i].title;
    exif_j[i].MyServer = dataexif[0].photos.photo[i].server;
    exif_j[i].MyFarm = dataexif[0].photos.photo[i].farm;
    exif_j[i].MySecret = dataexif[0].photos.photo[i].secret;

    // Temp doesnt work, when the check above "continues" it puts null values, somehow!
    // exif_j[i].MyExposureTime = temp.photo.exif[11].raw._content;
    // exif_j[i].MyExposureFStop = temp.photo.exif[12].raw._content;
    // exif_j[i].MyExposureType = temp.photo.exif[13].raw._content;
    // exif_j[i].MyExposureISO = temp.photo.exif[14].raw._content;
    // https://www.flickr.com/services/api/misc.urls.html find urls here
    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    let farm_id = exif_j[i].MyFarm;
    let server_id = exif_j[i].MyServer;
    let id = exif_j[i].MyId;
    let secret = exif_j[i].MySecret;
    exif_j[i].MyURL = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}.jpg`

    //   // saving photos.
    //   const post = new Photo({
    //     photoid: exif_j[i].MyId,
    //     owner: exif_j[i].MyOwner,
    //     title: exif_j[i].MyTitle,
    //     url: exif_j[i].MyURL,
    //   });
    //
    //   try{
    //   const savedPost = await post.save();
    //   res.json(savedPost);
    // }catch(err) {
    //   res.json({ message: err});
    // }
}



  // returning response of all json.
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
