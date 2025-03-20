let selectedCell = null;

let num1 = '';
let num2 = '';
let prod = '';
let prodThousands = '';
let prodHundreds = '';
let prodTens = '';
let prodOnes = '';
// Get all the grid items
const gridItems = document.querySelectorAll('.grid-item');

function newQuestion(){
    // Generate two random two-digit numbers
    num1 = Math.floor(Math.random() * 90) + 10; // Random number between 10 and 99
    num2 = Math.floor(Math.random() * 90) + 10; // Random number between 10 and 99
    prod = num1*num2;

    // Extract the tens and ones places of both numbers
    const num1Tens = Math.floor(num1 / 10);  // Tens place of num1
    const num1Ones = num1 % 10;              // Ones place of num1
    const num2Tens = Math.floor(num2 / 10);  // Tens place of num2
    const num2Ones = num2 % 10;              // Ones place of num2

    // Extract the tens and ones places of product
    prodThousands = Math.floor(prod / 1000);
    prodHundreds = Math.floor((prod % 1000) / 100);
    prodTens = Math.floor((prod % 100) / 10);  // Tens place of num1
    prodOnes = prod % 10 // ones place

    // Assign the tens and ones digits to the correct grids
    gridItems[6].textContent = num1Tens;  // Grid 7: Tens place of num1
    gridItems[7].textContent = num1Ones;  // Grid 8: Ones place of num1
    gridItems[10].textContent = num2Tens; // Grid 11: Tens place of num2
    gridItems[11].textContent = num2Ones; // Grid 12: Ones place of num2

    // Assign the prod to grids
    gridItems[20].textContent = prodThousands;
    gridItems[21].textContent = prodHundreds;
    gridItems[22].textContent = prodTens;
    gridItems[23].textContent = prodOnes;

    for (let i = 0; i < gridItems.length; i++) {
            if (i == 20 || i == 21 || i == 22 || i == 23) {
                gridItems[i].textContent = '';
            }
    }
    clearAll();
}

function clearAll(){
    for (let i = 0; i < gridItems.length; i++) {
      if (i == 6 || i == 7 || i == 10 || i == 11) {
          continue;
      } else gridItems[i].textContent = '';
      document.querySelector(".result").innerHTML = "";
  }
}

function checkAnswer(){
  if (gridItems[20].textContent == '' &&
      gridItems[21].textContent == '' &&
      gridItems[22].textContent == '' &&
      gridItems[23].textContent == ''
  ){
      document.querySelector(".result").innerHTML = " ";
  }else if (gridItems[20].textContent == prodThousands &&
      gridItems[21].textContent == prodHundreds &&
      gridItems[22].textContent == prodTens &&
      gridItems[23].textContent == prodOnes
  ){
      document.querySelector(".result").innerHTML = "Correct!";
  } else document.querySelector(".result").innerHTML = "Try again";
}

// Handle selecting a cell for input
    document.querySelectorAll('.carryon, .answer, .calc').forEach((cell, index) => {
    cell.addEventListener('click', () => {
    selectedCell = cell;
    openKeypad();
});
});

// Open the keypad when a cell is clicked
function openKeypad() {
    const keypad = document.getElementById('keypad');
    keypad.style.display = 'grid'; // show the keypad
    keypad.style.left = `${selectedCell.offsetLeft}px`;
    keypad.style.top = `${selectedCell.offsetTop + selectedCell.offsetHeight + 10}px`; // place the keypad below the cell
}

// Enter a number into the selected cell and hide the keypad
function enterNumber(num) {
    if (selectedCell) {
        selectedCell.textContent = num;
        closeKeypad();
    }
}

// Clear the selected cell content
function clearCell() {
  if (selectedCell) {
      selectedCell.textContent = '';
      closeKeypad(); // hide the keypad after clearing
  }
}

// Close the keypad after entering a number
function closeKeypad() {
    document.getElementById('keypad').style.display = 'none';
}

// Event listener for clicking outside the keypad
document.addEventListener('click', function(event) {
const keypad = document.getElementById('keypad');
const gridContainer = document.getElementById('grid-container');

// If the click is outside the keypad and grid, hide the keypad
    if (!keypad.contains(event.target) && !gridContainer.contains(event.target)) {
        closeKeypad();
    }
});
