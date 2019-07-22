// khai báo 1 biến card và gán tất cả phần tử matching-card vào
const cards = document.querySelectorAll('.matching-card');

// biến có thẻ lật
let hasFlippedCard = false;
// lock board
let lockBoard = false;
// tạo 2 card
let firstCard, secondCard;
//
let totalClick = 0;
//
let totalTime = 120;
//hàm lật card
function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  // xử lý card lật qua lại, thêm flip vào class "matching-card flip"
  this.classList.add('flip');
  this.ticker = document.getElementById('flips');
  // console.log(this.ticker);
  this.timeRemaining = document.getElementById('time-remaining');
  // console.log(this.timeRemaining);
  
  if(!hasFlippedCard) {
    // click thứ 1
    hasFlippedCard = true;
    firstCard = this;

    // console.log(this.totalTime);
    setCountDown();

    return;
  }

  // click thứ 2
  secondCard = this;

  //tăng số lượt lật
  totalClick++;
  this.ticker.innerText = totalClick;
  console.log(this.ticker);
  //kiểm tra match
  checkForMatch();

}

// hàm kiếm tra card đã match
function checkForMatch() {
  let isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? disableCards() : unFlipCard();
}

// hàm set card đã match
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// hàm xóa flip để card quay về trạng thái ban đầu
function unFlipCard() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 500);
}

// hàm reset nếu không trùng với firtCard
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null]
}

// ngẫu nhiên cho các card
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();


// setCountDown
function setCountDown() {
  return setInterval(() => {
      this.timeRemaining--;
      console.log(this.timeRemaining);
      // this.timer.innerText = this.timeRemaining;
      // if(this.timeRemaining === 0)
      //   alert("Game Over");
  }, 1000);
}
// hàm restart
function restartGame() {
  console.log('qq');
}

cards.forEach(card => card.addEventListener('click', flipCard));
