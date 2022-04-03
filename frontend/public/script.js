/* -------------------------------------------------------------------------- */
// Classes
/* -------------------------------------------------------------------------- */
class GatherCardInfo {
    constructor(title, sub, text) {
        this.title = title;
        this.sub = sub;
        this.text = text
    }
}

/* -------------------------------------------------------------------------- */
// Components
/* -------------------------------------------------------------------------- */
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
                <button class="send-btn btn-style">Send</button>
            </form>
            <div class="separator"></div>
            <div class="comment-container">
            </div>
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

const messageRenderer = (msg) => {
    root.insertAdjacentHTML("beforeend", `
    <section class="message-overlay">
        <div class="message-container">
            ${msg}
        </div>
    </section>
    `)

}

const commentHTML = (recComment) => {
    return `
    <div class="comment">
        <div class="commenter-info">
            <h3>${recComment.username}</h3>
            <h4>${recComment.avatar}</h4>
            <p>${recComment.date}</p>
        </div>
        <p class="comment-text">${recComment.comment}<p>
    </div>
    `
};


/* -------------------------------------------------------------------------- */
//FETCH
/* -------------------------------------------------------------------------- */
const getAllData = async () => {
    const request = await fetch('./public/data.json');
    const result = await request.json();
    return result;
};

/* -------------------------------------------------------------------------- */
// UTILITY FUNCTIONS
/* -------------------------------------------------------------------------- */
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
        return {
            title: nameOfCard,
            comment: textAreaValue,
            username: inputValue,
            avatar: selectValue,
            date: currentDate
        }
    
    }
};

const renderAllComments = (title, comments) => {

    const filteredComments = comments.map( comment => JSON.parse(comment['comment-info']) ).filter( comment => comment.title === title);

    const commentContainer = document.querySelector('.comment-container');
    commentContainer.innerHTML = '';
    commentContainer.insertAdjacentHTML("beforeend", filteredComments.map( comment => commentHTML(comment) ).join(''));
};


/* -------------------------------------------------------------------------- */
//CLICK EVENT HANDLERS 
/* -------------------------------------------------------------------------- */
const highlightCardHandler = (e) => {

    if (e.target.classList.contains('beer-card')){
        // gather the info from the current card to transfer into the highlight
        const currentCard = new GatherCardInfo(e.target.children[0].textContent, e.target.children[1].textContent, e.target.children[2].textContent)

        document.querySelector('body').classList.toggle('change-overflow');
        // render the highlighted card
        highlightCardRenderer(highlightCardHTML(currentCard));

        // render stars if vote was already casted

        if( Object.keys(localStorage).find(title => title === currentCard.title) ){
            const numberOfStars = localStorage[currentCard.title];

            document.getElementById(`star${numberOfStars}`).checked = true;
        }
    

        // render average stars
        fetch('/get-stars').then(result => {
            return result.json()
        }).then( starData => {
            // filter it for current card
            const filteredStarData = starData.filter(vote => vote.title === currentCard.title);
            // update average stsar rating on card
            const averageRating = ( filteredStarData.reduce( (total, cur) => {
                return total += parseInt(cur.star);
            }, 0) ) / filteredStarData.length;

            // render new average
            if (filteredStarData.length === 0){
                document.querySelector('.avg-rating').textContent = `Be the first to rate this!`;

            } else {
                document.querySelector('.avg-rating').textContent = `${averageRating.toPrecision(2)}`;
            };
        });

        // render comments
        fetch('/comment-download').then(comments => {
            return comments.json();
        }).then (result => {
            const recAllComments = result;
            renderAllComments(e.target.children[0].textContent, recAllComments);
        }).catch(error => {
            alert(error);
        });
    }
};

const closeHighlightedCard = (e) => {
    let classList = e.target.classList;
    if (classList.contains('highlight-overlay')){
        
        document.querySelector('.highlight-overlay').remove();
        
        document.querySelector('body').classList.toggle('change-overflow');
    }  
};

const closeMessageHandler = (e) => {
    let classList = e.target.classList;
    if (classList.contains('message-overlay')){

        document.querySelector('.message-overlay').remove();

        const curTitle = document.querySelector('.card-info h2').textContent;
        if( Object.keys(localStorage).find(title => title === curTitle) ){
            const numberOfStars = localStorage[curTitle];

            document.getElementById(`star${numberOfStars}`).checked = true;
        }
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
    if (classList.contains('send-btn')){
        e.preventDefault();

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
                    fetch('/comment-download').then(comments => {
                        return comments.json();
                    }).then (result => {
                        const recAllComments = result;
                        renderAllComments(checkResultArray.title, recAllComments);
                    }).catch(error => {
                        alert(error);
                    });
                }
            }).catch(error => {
                alert(error);

            });
            
            
        }



    };
};

const sendStarHandler = (e) => {
    let classList = e.target.classList;
    if (classList.contains('star')){
        const titleOfCard = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.card-info h2').textContent;
        const starNbr = e.target.parentNode.getAttribute('for').slice(-1);
        // gather data (title of card, how many stars, create user cookie)
        
        if( !localStorage.getItem(`${titleOfCard}`) ){
            localStorage.setItem(`${titleOfCard}`, `${starNbr}`);

            const starToSend = new FormData();
            starToSend.append('star', `${starNbr}`);
            starToSend.append('title', titleOfCard);
            
            fetch('/star-upload', {
                method: 'POST',
                body: starToSend
            }).then(data => {
                if(data.status === 200){
                        // scott meme
                        messageRenderer(`<img class="star-meme" src="./public/star-meme/star${starNbr}.gif">`);
                        setTimeout(() => closeMessageHandler(), 2000);
                        // fetch all stars
                    fetch('/get-stars').then(result => {
                        return result.json()
                    }).then( starData => {
                        // filter it for current card
                        const filteredStarData = starData.filter(vote => vote.title === titleOfCard);
                        // update average star rating on card
                        const averageRating = ( filteredStarData.reduce( (total, cur) => {
                            return total += parseInt(cur.star);
                        }, 0) ) / filteredStarData.length;

                        // render new average
                        e.target.parentNode.parentNode.querySelector('.avg-rating').textContent = `${averageRating.toPrecision(2)}`;
                    })

                }
            }).catch(error => {
                alert('something went wrong during posting');
            })


        } else {
            messageRenderer('Cannot cast more votes on one item!');        
        }

        console.log(localStorage)

    }
};


/* -------------------------------------------------------------------------- */

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
    document.addEventListener('click', sendStarHandler);
    document.addEventListener('click', closeMessageHandler);



};

window.addEventListener('load', init);