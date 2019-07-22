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

//hàm lật card
function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return;
  // xử lý card lật qua lại, thêm flip vào class "matching-card flip"
  this.classList.add('flip');
  this.ticker = document.getElementById('flips');
  
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

cards.forEach(card => card.addEventListener('click', flipCard));
