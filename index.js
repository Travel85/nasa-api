//call api and get images
async function getCuriosityImages() {
  const apiKey = "LdQjEcK695LM0Z27T7qi0uoK7yQvFVzQKdaNfohI";
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    //console.log(result);
    processImages(result);
  } catch (error) {
    console.error(error);
  }
}

//process result and create new object
function processImages(array) {
  const roverElements = array.photos.map((item) => ({
    image: item.img_src,
    id: item.id,
    date: item.earth_date,
  }));

  //console.log(roverElements);

  createItems(roverElements);
}

/* <div class="container">
<div class="item">
    <div class="image"> <img
            src='http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG'>
    </div>
    <div class="id">ID: 102693</div>
    <div class="date">Earth date: 2015-05-30</div>
</div> */
const container = document.querySelector(".container");

function createItems(array) {
  let limit = 1;

  array.forEach((element) => {
    if (limit <= 100) {
      const item = document.createElement("div");
      item.setAttribute("class", "item");
      const image = document.createElement("div");
      image.setAttribute("class", "image");
      const img = document.createElement("img");
      img.setAttribute("class", "img");
      img.src = element.image;

      const id = document.createElement("div");
      id.setAttribute("class", "id");
      id.innerHTML = `ID: ${element.id}`;

      const date = document.createElement("div");
      date.setAttribute("class", "date");
      date.innerHTML = `Earth date: ${element.date}`;
      image.appendChild(img);
      item.appendChild(image);
      item.appendChild(id);
      item.appendChild(date);
      container.appendChild(item);

      limit++;
    }
  });
}

getCuriosityImages();
