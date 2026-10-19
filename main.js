const imageE = document.querySelector("img");
const buttonE = document.querySelector("button");
const a = document.querySelector("a");
let nsfwToggle = document.getElementById("nsfw-toggle");


document.onload = fetchImage();


async function fetchImage() {
    console.log("Fetching image...");
    try {
        buttonE.disabled = true;
        let site = document.getElementById("site-select").value;
        if (site === "nekosmoe") {
            await fetchNekosMoe();
        }
        else if (site === "nekosbest") {
            await fetchNekosBest();
        }
        else {
            throw new Error("Invalid site selected.");
        }
        buttonE.disabled = false;
    }
    catch (err) {
        window.alert(err.message);
        buttonE.disabled = false;
    }
}



async function fetchNekosMoe() {
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
    let image_url = "https://nekos.moe/image/" + id;
    console.log(`Image link: ${image_url}`);

    imageE.src = image_url;
};

async function fetchNekosBest() {
    let random_url = `https://nekos.best/api/v2/neko?nsfw=${nsfwToggle.checked}`;

    let res = await fetch(random_url);
    let json = await res.json();

    if (!res.ok) {
        throw new Error(`Request failed with code ${res.status}\n${json.message ? json.message : "No message provided"}`);
    }

    let image_url = json.results[0].url;
    console.log(`Image link: ${image_url}`);

    imageE.src = image_url;
}
