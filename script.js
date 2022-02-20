let clickedCard = null;
let preventClick = false;
let pairsFound = 0;

const colors = [
    'blue',
    'indigo',
    'orange',
    'magenta',
    'red',
    'yellow',
    'pink',
    'green',
]

const cards = [...document.querySelectorAll('.card')];
// for randomizing colors
for(let color of colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex, 1);
    cardA.className += ` ${color}`
    cardA.setAttribute ('data-color', color);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex, 1);
    cardB.className += ` ${color}`
    cardB.setAttribute ('data-color', color);
}

function onCardClicked(e) {
    const target = e.currentTarget;

    if (
        preventClick ||
        target === clickedCard ||
        target.className.includes('done') )
        
     {
        return;
    }

    target.className = target.className
        .replace('color-hidden', '')
        .trim();
    //target.className =+ ' done';
    if (!clickedCard) {
        // if not clicked on card, display its color, keep track of it
        clickedCard = target;
    }   else if (clickedCard) {
        // if clicked on card, check if new one matches old one color
        if  (
            clickedCard.getAttribute('data-color') !== 
            target.getAttribute('data-color')
        ) {
            preventClick = true;
            setTimeout(() => {
                clickedCard.className = 
                clickedCard.className.replace('done', '').trim() + 
                ' color-hidden';
                target.className = 
                target.className.replace('done', '').trim() +
                ' color-hidden';
                clickedCard = null;
                preventClick = false;
            }, 700);
        } else {
            pairsFound++;
            clickedCard = null;
            if(pairsFound===8){
                alert('Congratz! You won this game :)');
            }
        }
        }       
      
}