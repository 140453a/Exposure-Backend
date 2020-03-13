const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const helper = require('../api_helper.js')
const Photo = require('../models/Photo');

// Gets 10 posts from today by default
router.get('/getPopular/:date?', async (req, res) => {
  let dataexif = await helper.savePopular(req.params);
  let exif_j = []
  for (var i = 0; i < dataexif[1].length; i++) {
    temp = JSON.parse(dataexif[1][i]);
    // Checking if picture api call went through.
    if(temp.stat == "fail"){
      exif_j[i] = temp;
      exif_j[i].status = "fail";
        continue;
    } else {
      exif_j[i] = {};
      exif_j[i].status = "success";
    }


    // checking if exif data is exposed, and setting values
    let a = 0, b = 0, c = 0, d = 0, e = 0;
    for (let x = 0; x < Object.keys(temp.photo.exif).length; x++) { // iterate thru all exif data
      if (temp.photo.exif[x].tag == "ExposureProgram"){
        exif_j[i].MyExposureType = temp.photo.exif[x].raw._content;
        a = 1;
      }
      else if (temp.photo.exif[x].tag == "ExposureTime"){
        exif_j[i].MyExposureTime = temp.photo.exif[x].raw._content;
        b = 1;
      }
      else if (temp.photo.exif[x].tag == "FNumber"){
        exif_j[i].MyExposureFStop = temp.photo.exif[x].raw._content;
        c = 1;
      }
      else if (temp.photo.exif[x].tag == "ISO"){
        exif_j[i].MyExposureISO = temp.photo.exif[x].raw._content;
        d = 1;
      }
      else if (temp.photo.exif[x].tag == "FocalLength"){
        exif_j[i].MyExposureFocal = temp.photo.exif[x].raw._content;
        e = 1;
        if (exif_j[i].MyExposureFocal < 30 || exif_j[i].MyExposureFocal > 200){
          exif_j[i].status = "fail";
          exif_j[i].message = "Focal Length Out Of bounds."
          e = 2;

        }
    }
      else{
        continue;
      }
    }
    // Checking for focal length.
    if (e == 2){
      continue;
    }
    // Checking if a+b+c+d+e == 5, if not, status = fail.
    if (a + b + c + d + e != 5){
      exif_j[i].status = "fail";
      exif_j[i].message = "Incorrect exif format"
      continue;
    }
    // Check complete, adding all information
    //exif_j[i] = temp;
    exif_j[i].MyId = dataexif[0].photos.photo[i].id;
    exif_j[i].MyOwner = dataexif[0].photos.photo[i].owner;
    exif_j[i].MyTitle = dataexif[0].photos.photo[i].title;
    exif_j[i].MyServer = dataexif[0].photos.photo[i].server;
    exif_j[i].MyFarm = dataexif[0].photos.photo[i].farm;
    exif_j[i].MySecret = dataexif[0].photos.photo[i].secret;


    // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    let farm_id = exif_j[i].MyFarm;
    let server_id = exif_j[i].MyServer;
    let id = exif_j[i].MyId;
    let secret = exif_j[i].MySecret;
    exif_j[i].MyURL = `https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}.jpg`
    exif_j[i].status = "success"


    // saving photos.
    if(exif_j[i].status == "success") {
      const photo = new Photo({
        photoid: exif_j[i].MyId,
        title: exif_j[i].MyTitle,
        url: exif_j[i].MyURL,
        exposure_type: exif_j[i].MyExposureType,
        exposure_time: exif_j[i].MyExposureTime,
        exposure_fstop: exif_j[i].MyExposureFStop,
        exposure_ISO: exif_j[i].MyExposureISO,
        exposure_flength: exif_j[i].MyExposureFocal
      });

      try{
        const savedPhoto = await photo.save();
        console.log("Photo saved!")
      }catch(err) {
        console.log("Couldn't save photo!");
      }
    }
}
  // returning response of all json.
  res.json(exif_j);

});



module.exports = router;
