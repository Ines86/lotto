const lotto = document.querySelector(".step-one .coupon");
const wyniki = document.querySelector(".wyniki");
const selectedNums = Array.from(
  document.querySelectorAll(".step-one .coupon div")
);
const button = document.querySelector("button");

const userLottoNumbers = [];
const machineLottoNumbers = [];

// Utwórz kupon
for (let i = 1; i <= 49; i++) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("num");
  newDiv.textContent = i;
  lotto.appendChild(newDiv);
}

// Wybierz 6 liczb
function selectNumbers(e) {
  if (userLottoNumbers.length === 6) return;
  if (e.target.className === "num") {
    e.target.style.background = "#9E9E9E";
    let lottoNumber = parseFloat(e.target.textContent);
    userLottoNumbers.push(lottoNumber);
  }
}

/**
LOTTO - losowanie
**/
function results() {
  if (userLottoNumbers.length === 6) {
    if (machineLottoNumbers.length === 6) return;
  // wylosuj liczbę od 1 do 49
  const num = Math.floor(Math.random() * 49 + 1);
  // sprawdź, czy liczba się nie powtarza
  for (let i = 0; i < machineLottoNumbers.length; i++) {
    if (num === machineLottoNumbers[i]) {
      return results();
    }
  }

  machineLottoNumbers.push(num);
  // utwórz kulę
  const wylosowanaKula = document.createElement("div");
  wylosowanaKula.classList.add("ball");
  const digit = document.createElement("p");
  digit.textContent = num;
  wyniki.appendChild(wylosowanaKula);
  wylosowanaKula.appendChild(digit);
  results();
  if (machineLottoNumbers.length === 6) {
    return findDuplicates(userLottoNumbers, machineLottoNumbers);
  }
  }
  
}

/// Porównaj wyniki
function findDuplicates(userLotto, machineLotto) {
  console.log(userLotto);
  console.log(machineLotto);
  // znajdź duplikaty
  const duplicates = userLotto.filter(num => machineLotto.includes(num));

  // jeśli duplikaty istnieją
  if (duplicates.length) {
    const message = document.querySelector("#message");

    if (duplicates.length === 1) {
      return (message.innerHTML = `Trafiłeś jedną liczbę: ${duplicates}.`);
    } else if (duplicates.length === 2) {
      return (message.innerHTML = `Trafiłeś dwie liczby: ${duplicates}.`);
    } else if (duplicates.length === 3) {
      return (message.innerHTML = `Nieźle! Trafiłeś trzy liczby: ${duplicates}.`);
    } else if (duplicates.length === 4) {
      return (message.innerHTML = `Trafiłeś cztery liczby: ${duplicates}.`);
    } else if (duplicates.length === 5) {
      return (message.innerHTML = `Trafiłeś pięć liczb: ${duplicates}.`);
    } else if (duplicates.length === 6) {
      return (message.innerHTML = `Trafiłeś sześć liczb: ${duplicates}.`);
    }
    // jeśli nie ma duplikatów
  } else {
    return (message.innerHTML = "Nie trafiłeś żadnej liczby.");
  }
}

lotto.addEventListener("click", selectNumbers);
button.addEventListener("click", results);
