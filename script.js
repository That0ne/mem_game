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


let shuffledColors = shuffle(COLORS);
console.log(shuffledColors);

counter.addEventListener("click", createDivsForColors);

function createDivsForColors() {
  const colorArray = COLORS;
  console.log(colorArray);
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    
    newDiv.classList.add(color);

    newDiv.addEventListener("click", currentCard);

    gameContainer.append(newDiv);   
  }
  counter.removeEventListener('click', createDivsForColors);
  addMore.addEventListener('click', addMoreCards);
}

function addMoreCards(e){
  let newCards = 0;
  while(newCards <2){
    const newDiv1 = document.createElement("div");
    const newDiv2 = document.createElement("div");
    const randomColor = 'a' + Math.floor(Math.random()*16777215).toString(16);
    
    newDiv1.classList.add(randomColor);
    newDiv2.classList.add(randomColor);

    newDiv1.addEventListener("click", currentCard);
    newDiv2.addEventListener("click", currentCard);

    gameContainer.append(newDiv1, newDiv2);
    newCards++;
  }
}




resetButton.addEventListener('click', function timedRefresh(time) {
	setTimeout("location.reload(true);", 0);
})

function currentCard(e) {
  e.target.removeEventListener("click", currentCard);
  let removeAll = document.querySelectorAll('div > div');
  let remove = document.querySelectorAll(`div[class = ${e.target.classList[0]}]`);
  counter.innerText = Math.floor((count+1)/2);
  
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
    console.log(colorString);
    e.target.style.backgroundColor = `#${colorString}`;
  };
  matchArr.push(e.target);
  
  

  
  if(count%2 === 0 && e.target.classList[0] === matchArr[matchArr.length-2].classList[0]){
    counter.innerText = `HOORAY!`;
    setTimeout(function(){
      counter.innerText = Math.floor((count+1)/2);
    },1000);
    remove[0].removeEventListener("click", currentCard);
    remove[1].removeEventListener("click", currentCard);
    
  } else if (count%2 === 0 && e.currentTarget.classList[0] !== matchArr[matchArr.length-2].classList[0]){
    counter.innerText = `Try Again`;
    setTimeout(function(){
      counter.innerText = Math.floor((count+1)/2);
    },1000);
      removeAll.forEach(item => {
        item.removeEventListener('click', currentCard);
      });
    
    
    setTimeout(function (){
      e.target.style.backgroundColor = '#fff';
      matchArr[matchArr.length-2].style.backgroundColor = '#fff';
      removeAll.forEach(item => {
        item.addEventListener('click', currentCard);
      })
        }, 1000);
      }
      count++
    };
    
    


