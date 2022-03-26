// Components
const navbarHTML = (recNavAnchorsHTML) => {
    return `
    <nav class="navbar">
        <ul class="nav-list">
            ${recNavAnchorsHTML}
        </ul>
    </nav>
    `;
};

const containerHTML = (sectionName, recBeerHTML) => {
    return `
    <section id="${sectionName}" class="container">
        <h1>${sectionName}</h1>
        <div class="beer-cards">
            ${recBeerHTML}
        </div>
    </section>
    `
};

const cardHTML = (beerList) => {
    return Array.from(beerList).map(beer => {
        return `
        <div class="beer-card">
            <h2>${beer.title}</h2>
            <h3>${beer.sub}</h3>
            <p>${beer.text}</p>
        </div>
        `
    }).join('');
};

const navAnchorsHTML = () => {
    const anchorList = [
        {
            link: '#Beers',
            title: 'Beers',
            iconClass: 'fas fa-beer-mug-empty'
        },
        {
            link: '#Wine',
            title: 'Wine',
            iconClass: 'fas fa-wine-glass'
        },
        {
            link: '#Spirits',
            title: 'Spirits',
            iconClass: 'fas fa-whiskey-glass'
        },
        {
            link: '#Cocktails',
            title: 'Cocktails',
            iconClass: 'fas fa-martini-glass'
        },
        {
            link: '#Quotes',
            title: 'Quotes',
            iconClass: 'fas fa-crown'
        }

    ];

    return anchorList.map(a => {
        return `
        <a href="${a.link}">
            <span>${a.title}</span>
            <i class="${a.iconClass}"></i>
        </a>
        `
    }).join('');
};



//FETCH

const getAllData = async () => {
    const request = await fetch('./pub/data.json');
    const result = await request.json();
    return result;
};




const init = async () => {
    const root = document.getElementById('root');
    
    //Get Data
    const allData = await getAllData();
    console.log(allData);

    //Create HTML
    root.insertAdjacentHTML('beforeend', navbarHTML(navAnchorsHTML()));
    root.insertAdjacentHTML('beforeend', allData.map(section => containerHTML(section.id, cardHTML(section.cards))).join(''));


};

window.addEventListener('load', init);