const gameContainer = document.getElementById("game");
const resetButton = document.getElementById('reset');
let container  = document.getElementById('container');
let counter = document.querySelector('#counter');
let addMore = document.querySelector('#addMore');
let count = 1;
let matchArr = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
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
counter.addEventListener("click", createDivsForColors);


// Creating divs for cards and adding classes
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
  counter.removeEventListener('click', createDivsForColors);

  //enabling the add cards button
  addMore.addEventListener('click', addMoreCards);
}



// adds 4 more cards with new colors added to color array
function addMoreCards(e){
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
resetButton.addEventListener('click', function timedRefresh(time) {
	setTimeout("location.reload(true);", 0);
})



//
function currentCard(e) {
  //once clicked it removes the event listener so it cant be clicked again
  e.target.removeEventListener("click", currentCard);
  let removeAll = document.querySelectorAll('div > div');
  let remove = document.querySelectorAll(`div[class = ${e.target.classList[0]}]`);
  //the math to increment the counter
  counter.innerText = Math.floor((count+1)/2);
  
  //change color of card depending on the class attribute
  if(e.target.classList.value === 'red' || 
    e.target.classList.value === 'blue' || 
    e.target.classList.value ==='green' || 
    e.target.classList.value ==='purple' || 
    e.target.classList.value ==='orange'){
    e.target.style.backgroundColor = e.target.classList.value;
  } else{
    let color = e.target.classList.value;
    let colorArr = color.split('');
    colorArr.shift();
    colorString = colorArr.join('');
    e.target.style.backgroundColor = `#${colorString}`;
  };

  for(let i = 0; i <removeAll.length; i++){
    if(!removeAll[i].backgroundColor){
      break;
    }else{
      localStorage.setItem('Low Score', counter.innerText);
    }
  }

  //for matching the two cards during each attempt
  matchArr.push(e.target);
  

  //if they match, remove event listener and keep color
  if(count%2 === 0 && e.target.classList[0] === matchArr[matchArr.length-2].classList[0]){
    counter.innerText = `HOORAY!`;
    setTimeout(function(){
      counter.innerText = Math.floor((count+1)/2);
    },1000);
    remove[0].removeEventListener("click", currentCard);
    remove[1].removeEventListener("click", currentCard);
    
    //if they dont match try again
  } else if (count%2 === 0 && e.currentTarget.classList[0] !== matchArr[matchArr.length-2].classList[0]){
    counter.innerText = `Try Again`;
    setTimeout(function(){
      counter.innerText = Math.floor((count+1)/2);
      // set localStorage with low score if all divs have background colors
    },1000);
    removeAll.forEach(item => {
      item.removeEventListener('click', currentCard);
    });
    
    //if they dont match change back to white and increment counter
    setTimeout(function (){
      e.target.style.backgroundColor = '';
      matchArr[matchArr.length-2].style.backgroundColor = '';
      removeAll.forEach(item => {
        item.addEventListener('click', currentCard);
      })
      
    }, 1000);
  }
  count++
  
  
  
};

// for(let i = 0; i <removeAll.length; i++){
//   if(!removeAll[i].backgroundColor){
//     break;
//   }else{
//     localStorage.setItem('Low Score', counter.innerText);
//   }
// }

