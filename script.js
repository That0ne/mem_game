const gameContainer = document.getElementById("game");
const resetButton = document.getElementById('reset');
let container  = document.getElementById('container');
let addMore = document.querySelector('#addMore');
let lowScore = document.querySelector('h3');
let count = 1;
let matchArr = [];

// set initial low score to 0 if localStorage is null
let LS = localStorage.getItem('Low Score');
if(LS === null){
  lowScore.innerText = 'Low Score = 0'
}else {
lowScore.innerText = `Low Score = ${LS}`;
};


let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

//randomizing the color array
function shuffle(array) {
  let counter = array.length;
  // FISHER-YATES SORTING ALGORITHM
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

//enabling the start button
addMore.addEventListener("click", createDivsForColors);


// creating divs for cards and adding classes
function createDivsForColors() {
  let shuffledColors = shuffle(COLORS);
  for (let color of shuffledColors) {
    const newDiv = document.createElement("div");   
    newDiv.classList.add(color);
    //adds event listener to click card and change color
    newDiv.addEventListener("click", currentCard);
    gameContainer.append(newDiv);   
  }
  //disabling the start button
  addMore.removeEventListener('click', createDivsForColors);
  //enabling the add cards button
  addMore.addEventListener('click', addMoreCards);
  addMore.innerText = "ADD MORE CARDS"
}


// once game has started disable add cards
gameContainer.addEventListener("click", () => {
  addMore.removeEventListener('click', createDivsForColors);
  addMore.removeEventListener('click', addMoreCards);
});



// adds 4 more cards with new colors added to color array
function addMoreCards(){
  let newCards = 0;
  while(newCards <2){
    const randomColor = 'a' + Math.random().toString(16).slice(2, 8);

    COLORS.push(randomColor);
    COLORS.push(randomColor);
    newCards++;
  }
  gameContainer.innerHTML = "";
  createDivsForColors();
}



//resets the entire game
resetButton.addEventListener('click', function () {
  gameContainer.innerHTML = "";
  count = 1;
  COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "yellow"
  ];;
  addMore.innerText = "START";
  addMore.addEventListener('click', createDivsForColors);
  lowScore.innerText = `Low Score = ${localStorage.getItem('Low Score')}`;
})



//function for logic of matching card game
function currentCard(e) {
  //once clicked it removes the event listener so it cant be clicked again
  e.target.removeEventListener("click", currentCard);
  let removeAll = document.querySelectorAll('div > div');
  let remove = document.querySelectorAll(`div[class = ${e.target.classList[0]}]`);
  //the math to increment the counter
  let turn = Math.floor((count+1)/2);
  addMore.innerText = turn;
  
  //change color of card depending on the class attribute
  if(e.target.classList.value === 'red' || 
    e.target.classList.value === 'blue' || 
    e.target.classList.value ==='green' || 
    e.target.classList.value ==='purple' || 
    e.target.classList.value ==='orange' ||
    e.target.classList.value ==='yellow'){
    e.target.style.backgroundColor = e.target.classList.value;
  } else{
    let color = e.target.classList.value;
    let colorArr = color.split('');
    colorArr.shift();
    colorString = colorArr.join('');
    e.target.style.backgroundColor = `#${colorString}`;
  };
  
  //for matching the two cards during each attempt
  matchArr.push(e.target);
  

  //if they match, remove event listener and keep color
  if(count%2 === 0 && e.target.classList[0] === matchArr[matchArr.length-2].classList[0]){
    addMore.innerText = `HOORAY!`;
    setTimeout(function(){
      addMore.innerText = turn;
    },1000);
    remove[0].removeEventListener("click", currentCard);
    remove[1].removeEventListener("click", currentCard);
    
    //if they dont match try again
  } else if (count%2 === 0 && e.currentTarget.classList[0] !== matchArr[matchArr.length-2].classList[0]){
      addMore.innerText = `Try Again`;
    setTimeout(function(){
        addMore.innerText = turn;
    },1000);
    removeAll.forEach(item => {
      item.removeEventListener('click', currentCard);
    });
    
    //if they dont match change back to white and increment counter
    setTimeout(function (){
      e.target.removeAttribute('style');
      matchArr[matchArr.length-2].removeAttribute('style');
      removeAll.forEach(item => {
        item.addEventListener('click', currentCard);
      })
      
    }, 1000);
  }


  // set low score in localStorage if new low score or no low score
  let cardList = Array.from(removeAll);
  
  if(cardList.every(item => item.hasAttribute('style')) && 
    (turn < localStorage.getItem('Low Score') || 
    localStorage.getItem('Low Score') === null)){
    
      localStorage.setItem('Low Score', turn);
  };

  count++ 
};



