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

const welcomeHTML = () => {
    return `
    <section class='welcome-section container'>
        <div>
            <h1>Welcome to iDrink</h1>
            <p>Top 10 Drinks for You to enjoy!</p>
        </div>
    </section>
    `
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
            link: '#',
            title: 'iDrink',
            icon: '<i class="material-icons">double_arrow</i>'
        },
        {
            link: '#Beers',
            title: 'Beers',
            icon: '<i class="material-icons">sports_bar</i>'
        },
        {
            link: '#Wine',
            title: 'Wine',
            icon: '<i class="fas fa-wine-glass"></i>'
        },
        {
            link: '#Spirits',
            title: 'Spirits',
            icon: '<i class="material-icons">liquor</i>'
        },
        {
            link: '#Quotes',
            title: 'Quotes',
            icon: '<i class="fas fa-crown"></i>'
        }

    ];

    return anchorList.map((a,i) => {
        return `
        <a class="${i === 0 ? 'home' : ''}" href="${a.link}">
            <span>${a.title}</span>
            ${a.icon}
        </a>
        `
    }).join('');
};



//FETCH

const getAllData = async () => {
    const request = await fetch('./public/data.json');
    const result = await request.json();
    return result;
};

//HANDLERS

const cardGoogleSearch = (e) => {
    console.log(e.target);
    if (e.target.classList.contains('beer-card')){
        window.open(`https://www.google.com/search?q=${Array.from(e.target.children).map(child => child.textContent === '-Theoden' ? 'Theoden' : child.textContent).join(' ')}`, '_blank');
    }
};





const init = async () => {
    const root = document.getElementById('root');
    
    //Get Data
    const allData = await getAllData();
    console.log(allData);

    //Create HTML
    root.insertAdjacentHTML('beforeend', navbarHTML(navAnchorsHTML()));
    root.insertAdjacentHTML('beforeend', welcomeHTML());

    root.insertAdjacentHTML('beforeend', allData.map(section => containerHTML(section.id, cardHTML(section.cards))).join(''));


    //Event Listeners
    document.addEventListener('click', cardGoogleSearch);


    console.log(new Date(Date.now()));

};

window.addEventListener('load', init);