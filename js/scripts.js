// khai báo 1 biến card và gán tất cả phần tử matching-card vào
const cards = document.querySelectorAll('.matching-card');

// biến có thẻ lật
let hasFlippedCard = false;
// lock board
let lockBoard = false;
// tạo 2 card
let firstCard, secondCard;
// tổng số lần đã click
let totalClick = 0;
//checkWinGame
let checkWinGame = 8;

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

    return;
  }

  // click thứ 2
  secondCard = this;

  //tăng số lượt lật
  totalClick++;
  this.ticker.innerText = totalClick;
  // console.log(this.ticker);
  //kiểm tra match
  checkForMatch();

  winGame();
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

  checkWinGame--;
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

// hàm reset nếu không trùng với firstCard
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
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

// hàm winGame
function winGame() {
  if (checkWinGame === 0) alert("You WIN");
}

// hàm restart
function restartGame() {
  window.location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard));

//đồng hồ đếm ngược
var m = 1; // Phút
var s = 30; // Giây
var m_text;
var s_text;             
var timeout = null; // Timeout
             
function oclock()
{
  s--;
  if(s == -1)
  {
    m = m - 1;
    s = 59;
  }
  if(m == -1)
  {
    alert("Time out!");

  }
  if(m < 10)
  {
    m_text = "0" + m.toString();
  }
  else{
    m_text = m_text.toString();
  }
  if(s < 10)
  {
    s_text = "0" + s.toString();
  }else{
    s_text = s.toString();
  }
  document.getElementById("001").innerHTML = m_text + ":" + s_text;
}

//gọi hàm trong oclock trong mỗi giây

setInterval(oclock,1000); //1000ms

function stop(){
   clearTimeout(timeout);
} 

