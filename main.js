const imageE = document.querySelector("img");
const buttonE = document.querySelector("button");
const a = document.querySelector("a");
let nsfwToggle = document.getElementById("nsfw-toggle");

async function getImage() {
  try {
    buttonE.disabled = true;
    let random_url = `https://nekos.moe/api/v1/random/image?nsfw=${nsfwToggle.checked}`;
    console.log(random_url);
    let res = await fetch(random_url);
    console.log(res.status);
    let json = await res.json();
    console.log(json);

    if (!res.ok) {
      throw new Error(`Request failed with code ${res.status}\n${json.message ? json.message : "No message provided"}`);
    }
    if (!json.images || json.images.length === 0) { 
      throw new Error("No images found in the API response.");
    }

    let id = json.images[0].id;
    console.log(`Image id: ${id}`);
    let image_url = "https://nekos.moe/image/" + id;

    imageE.src = `${image_url}`;
    buttonE.disabled = false;
  }
  catch (err) {
    window.alert(err.message);
    buttonE.disabled = false;
  }
};

document.onload = getImage();
