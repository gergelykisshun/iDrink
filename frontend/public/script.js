// Classes

class GatherCardInfo {
    constructor(title, sub, text) {
        this.title = title;
        this.sub = sub;
        this.text = text
    }
}


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

const highlightCardHTML = (recCard) => {
    return `
    <div class="card-info">
        <h2>${recCard.title}</h2>
        <h3>${recCard.sub}</h3>
        <p>${recCard.text}</p>
        <button class="show-me-btn btn-style">Show me!</button>
    </div>
    <div class="rate-and-comments">
        <div class="rate-stars">
            <p class="avg-rating">4.3</p>
            <input type="radio" name="stars" id="star5"><label for="star5"><i class="material-icons-outlined star">star</i></label>
            <input type="radio" name="stars" id="star4"><label for="star4"><i class="material-icons-outlined star">star</i></label>
            <input type="radio" name="stars" id="star3"><label for="star3"><i class="material-icons-outlined star">star</i></label>
            <input type="radio" name="stars" id="star2"><label for="star2"><i class="material-icons-outlined star">star</i></label>
            <input type="radio" name="stars" id="star1"><label for="star1"><i class="material-icons-outlined star">star</i></label>
        </div>
        <div class="comment-section">
            <form class="form-comment">
                <input placeholder="Name" class="input-style name-input" type="text" name="name" required>
                <label for="select" class="select-avatar">Avatar
                    <select id="select" class="select-avatar input-style" required>
                        <option value="😀">😀</option> 
                        <option value="🤣">🤣</option> 
                        <option value="😎">😎</option> 
                        <option value="😶">😶</option> 
                        <option value="🤗">🤗</option> 
                        <option value="🤩">🤩</option> 
                    </select>
                </label>
                <textarea class="input-style" placeholder="Write a comment..." type="text-area" name="write-comment" rows="3" required></textarea>
                <button class="btn-style">Send</button>
            </form>
            <div class="separator"></div>
            <div class="comment">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure</div>
            <div class="comment">There are manyof Lorem Ipsum available, going to use a passage of Lorem Ipsum, you need to be sure</div>
        </div>
    </div>    
    `;
};


const highlightCardRenderer = (recHighlightCardHTML) => {
    root.insertAdjacentHTML("beforeend", `
            <section class="highlight-overlay">
                <div class="highlight-container">
                    ${recHighlightCardHTML}
                </div>
            </section>
            `)
};




//FETCH

const getAllData = async () => {
    const request = await fetch('./public/data.json');
    const result = await request.json();
    return result;
};


// UTILITY FUNCTIONS

const inputFieldChecker = (form) => {

    const nameOfCard = document.querySelector('.card-info h2').textContent;
    const textAreaValue = form.querySelector('textarea').value;
    const inputValue = form.querySelector('input').value;
    const selectValue = form.querySelector('select').value;
    const dateToSend = new Date();
    const currentDate = `${dateToSend.getFullYear()}-${dateToSend.getMonth() + 1}-${dateToSend.getDate()}`;


    if (!textAreaValue){
        return false;
    } else if (!inputValue){
        return false;
    } else if (!selectValue){
        return false;
    } else {
        return [
            nameOfCard,
            textAreaValue,
            inputValue,
            selectValue,
            currentDate
        ]
    
    }
};



//CLICK EVENT HANDLERS 

const highlightCardHandler = (e) => {

    if (e.target.classList.contains('beer-card')){
        // gather the info from the current card to transfer into the highlight
        const currentCard = new GatherCardInfo(e.target.children[0].textContent, e.target.children[1].textContent, e.target.children[2].textContent)

        document.querySelector('body').classList.toggle('change-overflow');
        // render the highlighted card
        highlightCardRenderer(highlightCardHTML(currentCard));
    }
};

const closeHighlightedCard = (e) => {
    let classList = e.target.classList;
    if (classList.contains('highlight-overlay')){
        
        document.querySelector('.highlight-overlay').remove();
        
        document.querySelector('body').classList.toggle('change-overflow');
    }  
};

const showMeHandler = (e) => {
    let classList = e.target.classList;
    if (classList.contains('show-me-btn')){
        window.open(`https://www.google.com/search?q=${Array.from(e.target.parentNode.children).map(child => child.textContent === '-Theoden' ? 'Theoden' : child.textContent).slice(0, -1).join(' ')}`, '_blank');
    }

}

const sendCommentHandler = (e) => {
    let classList = e.target.classList;
    if (classList.contains('btn-style')){
        e.preventDefault();
        console.log('posted a comment');

        // check input fields and organize them in an object
        let checkResultArray = inputFieldChecker(document.querySelector('.form-comment'));
        if (!checkResultArray){
            alert('Please fill all the fields!');
        } else {
            // put them in FormData
            const dataToSend = new FormData();
            dataToSend.append( 'comment-info', JSON.stringify(checkResultArray) );
            
            // post them on the data on the server
            fetch('/comment-upload', {
                method: 'POST',
                body: dataToSend
            }).then(data => {
                if (data.status === 200){
                    // if successful render the comment
                    console.log('post successful!')
                }
            }).catch(error => {
                alert(error);

            });
            
            
        }



    };
};


// THIS IS FOR THE GOOGLE SEARCH!!!
// window.open(`https://www.google.com/search?q=${Array.from(e.target.children).map(child => child.textContent === '-Theoden' ? 'Theoden' : child.textContent).join(' ')}`, '_blank');


const init = async () => {
    const root = document.getElementById('root');
    
    //Get Data
    const allData = await getAllData();


    //Create HTML
    root.insertAdjacentHTML('beforeend', navbarHTML(navAnchorsHTML()));
    root.insertAdjacentHTML('beforeend', welcomeHTML());

    root.insertAdjacentHTML('beforeend', allData.map(section => containerHTML(section.id, cardHTML(section.cards))).join(''));


    //Event Listeners
    document.addEventListener('click', highlightCardHandler);
    document.addEventListener('click', closeHighlightedCard);
    document.addEventListener('click', showMeHandler);
    document.addEventListener('click', sendCommentHandler);



};

window.addEventListener('load', init);