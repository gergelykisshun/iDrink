// Components

const containerHTML = (recBeerHTML) => {
    return `
    <section class="container">
			<h1>Beers Page</h1>
			<div class="beer-cards">
				${recBeerHTML}
			</div>
		</section>
    `
};

const BeerHTML = (beerList) => {
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



//FETCH

const getBeers = async () => {
    const request = await fetch('./pub/data.json');
    const result = await request.json();
    return result;
};




const init = async () => {
    const root = document.getElementById('root');
    
    //Get Data
    const beers = await getBeers();
    console.log(beers);

    //Create HTML
    root.insertAdjacentHTML('beforeend', containerHTML(BeerHTML(beers.cards)));


};

window.addEventListener('load', init);