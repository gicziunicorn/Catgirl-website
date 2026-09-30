const imageE = document.querySelector("img");
const buttonE = document.querySelector("button");
const a = document.querySelector("a");

const getImage = async () => {
  buttonE.disabled = true;
  let random_url = "https://nekos.moe/api/v1/random/image";
  let res = await fetch(random_url).then((r) => r.json());
  console.log(res);

  let id = res.images[0].id;
  console.log(`Image id: ${id}`);
  let image_url = "https://nekos.moe/image/" + id;

  imageE.src = `${image_url}`;
  
  buttonE.disabled = false;
};

document.onload = getImage();
