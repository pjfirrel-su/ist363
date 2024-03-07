// console.log("js has been loaded");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn")
const contentDiv = document.getElementById('content')

menuBtn.addEventListener("click", function() {
    // console.log("clicked!")
    mobileMenu.classList.add("active");
}); // end of menuBtn click

closeBtn.addEventListener("click", function() {
    mobileMenu.classList.remove("active");
});

function renderProperties(properties) {
    properties.forEach((room) => {

    // create elements
    const roomArticle = document.createElement('article');
    roomArticle.classList.add('room');

    const roomNameElement = document.createElement('h3');
    roomNameElement.classList.add('room--name');
    roomNameElement.textContent = room.name;

    const roomDescriptionElement = document.createElement('p');
    roomDescriptionElement.classList.add('room--description');
    roomDescriptionElement.textContent = room.description;

    const roomPriceElement = document.createElement('p');
    roomPriceElement.textContent = `Price: ${room.price}`;

    const roomGuestsElement = document.createElement('p');
    roomGuestsElement.textContent = `Guests: ${room.guests}`;

    roomArticle.appendChild(roomNameElement);
    roomArticle.appendChild(roomDescriptionElement);
    roomArticle.appendChild(roomPriceElement);
    roomArticle.appendChild(roomGuestsElement);

    document.body.appendChild(roomArticle);

}); // end of forEach
} // end of render properties

// fetch('./js/properties.json')
//     .then((response) => response.json())
//     .then((data) => {
//         // console.log(data);
//         renderProperties(data);
//     });

const displayCategory = (category, properties) => {
    //console.log({category})
    const sectionElement = document.createElement('section');
    sectionElement.classList.add('slider');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('slider__container');

    const sliderGrid = document.createElement('div');
    sliderGrid.classList.add('slider__grid');

    // const sectionTitle = document.createElement('h2');
    // sectionTitle.textContent = category.label.plural;

    // containerDiv.appendChild(sectionTitle);
    
    // console.log(category.label.singular);
    // 1. filter properties
    const filteredProperties = properties.filter((property) => {
        // return true or false
        return category.label.singular === property.type;
    });

    filteredProperties.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    // console.log({filteredProperties})
    filteredProperties.forEach((property) => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('slider__item');

        // const propertyTitle = document.createElement('h3');
        // propertyTitle.classList.add('property--title');

        let propertyHtml = `
            <h3 class="property--title">${property.name}</h3>
            <p class="property--description">${property.description}</p>
            <p class="property--price">${property.price}</p>
        `;

        articleElement.innerHTML = propertyHtml;

        sliderGrid.appendChild(articleElement);

    }); // end of forEach

    // 2. loop and append properties
    containerDiv.appendChild(sliderGrid);
    sectionElement.appendChild(containerDiv);
    contentDiv.appendChild(sectionElement);
} // end of displayCategory

Promise.all([
    // fetch 1
    fetch('js/properties.json').then(response => response.json()),
    // fetch 2
    fetch('js/categories.json').then(response => response.json())
    ])
    .then(([properties, categories]) => {
        //console.log({properties});
        //console.log({categories});
        categories.forEach(category => {
        displayCategory(category, properties);
      });
    })
    .catch((error) => {
        console.error("There was a problem fetching the data:", error);
    });
