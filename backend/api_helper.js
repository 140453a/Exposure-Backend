const express = require('express');
const fetch = require('node-fetch');
const async = require('async');
const KEY = process.env.FLICKR_KEY;

async function savePopular(req, res){
  // Getting just 3 pictures to limit api calls while testing |v
  try{
    let test = await fetch(`https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&format=json&nojsoncallback=1&per_page=3&api_key=${KEY}`,
    {method: "GET",
    headers: {}});
    const data = await test.json();
    exif_data = await getExif(data);
    //console.log(exif_data)
    return await exif_data
  }catch(err) {console.log(err)}
}


async function getExif(data){
  try{
    var id_arr = [];
     Object.keys(data.photos.photo).forEach((item, i) => {
      let photoid = data.photos.photo[i].id;
      id_arr[i] = `https://www.flickr.com/services/rest/?method=flickr.photos.getExif&photo_id=${photoid}&format=json&nojsoncallback=1&api_key=${KEY}`
      });


      var promises = id_arr.map(url => fetch(url).then(y => y.text()));
      return Promise.all(promises)
  .catch(error => console.log(`Error in promises ${error}`))


  }catch(err) {console.log(err)}

}



async function savePhoto(photo) {
  let savedPhoto = await photo.save();
  res.json(savedPhoto);
}



module.exports  = {savePhoto, savePopular};
