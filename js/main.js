import "picturefill";
import custom from "./modules/custom";

window.addEventListener("load", () => {
  custom();
});

const cardNumberInput = document.getElementById("cardNumberInput");
const cardNumberPreview = document.querySelector(".card__preview--number");
const cardNameInput = document.getElementById("cardNameInput");
const cardHolderSpan = document.querySelector(".card__preview--holder-span");
const cardExpiredSpan = document.querySelector(".card__preview--expire-span");
const cardNamePreview = document.querySelector(".card__preview--holder");
const cardDateInput = document.getElementById("cardDateInput");
const cardDateExpired = document.querySelector(".card__preview--expire-date");
const monthSelect = document.getElementById("card__form--select__month");
const yearSelect = document.getElementById("card__form--select__year");
const cardContainer = document.querySelector(".card");
const cardCVVInput = document.getElementById("cardCVV");
const cvvPreview = document.getElementById("cvvPreview");

const cardNameError = document.createElement("span");
cardNameError.classList.add("error-message");
cardNameInput.parentNode.insertBefore(cardNameError, cardNameInput.nextSibling);

const cardNumberError = document.createElement("span");
cardNumberError.classList.add("error-message");
cardNumberInput.parentNode.insertBefore(
  cardNumberError,
  cardNumberInput.nextSibling
);

const monthError = document.createElement("span");
monthError.classList.add("error-message");
monthSelect.parentNode.insertBefore(monthError, monthSelect.nextSibling);

const yearError = document.createElement("span");
yearError.classList.add("error-message");
yearSelect.parentNode.insertBefore(yearError, yearSelect.nextSibling);

function checkFormCompletion() {
  if (
    checkCardNumberValidity() &&
    checkCardNameValidity() &&
    cardNumberInput.value !== "" &&
    cardNameInput.value !== "" &&
    yearSelect.value !== "Year" &&
    monthSelect.value !== "Month"
  ) {
    cardContainer.classList.add("flipped");
  }
}

monthSelect.addEventListener("change", function () {
  checkMonthValidity, updateCardDate();
});

yearSelect.addEventListener("change", function () {
  checkYearValidity, updateCardDate();
});

monthSelect.addEventListener("input", function () {
  toggleExpireSpanClass();
});

yearSelect.addEventListener("input", function () {
  toggleExpireSpanClass();
});

function toggleExpireSpanClass() {
  if ((monthSelect.value !== "Month" && yearSelect.value === "Year") || 
  (monthSelect.value === "Month" && yearSelect.value !== "Year")) {
    cardExpiredSpan.classList.add("active");
  } else {
    cardExpiredSpan.classList.remove("active");
  }
}

cardNumberInput.addEventListener("input", function () {
  let cardNumber = cardNumberInput.value.replace(/\D/g, "");
  if (cardNumber.length > 16) {
    cardNumber = cardNumber.slice(0, 16);
    cardNumberError.textContent = "";
  } else {
    cardNumberError.textContent = "Please provide a 16-digit number.";
  }
  let formattedCardNumber = cardNumber
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  cardNumberPreview.textContent = formattedCardNumber || "#### #### #### ####";
  cardNumberInput.value = formattedCardNumber;

  checkFormCompletion();
});

function checkCardNumberValidity() {
  const cardNumber = cardNumberInput.value.replace(/\D/g, "");
  return cardNumber.length === 16;
}

function checkMonthValidity() {
  if (monthSelect.value === "Month") {
    monthError.textContent = "Please select the month!";
    return false;
  } else {
    monthError.textContent = "";
    return true;
  }
}

function checkYearValidity() {
  if (yearSelect.value === "Year") {
    yearError.textContent = "Please select the year!";
    return false;
  } else {
    yearError.textContent = "";
    return true;
  }
}

monthSelect.addEventListener("blur", function () {
  checkMonthValidity();
  updateCardDate();
});

yearSelect.addEventListener("blur", function () {
  checkYearValidity();
  updateCardDate();
});

function checkCardNameValidity() {
  const namePattern = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;

  if (!namePattern.test(cardNameInput.value)) {
    cardNameError.textContent = "Please provide full username!";
    return false;
  } else {
    cardNameError.textContent = "";
    return true;
  }
}

cardNameInput.addEventListener("blur", function () {
  checkCardNameValidity();
  checkFormCompletion();
});

cardNameInput.addEventListener("input", function () {
  let cardName = cardNameInput.value.replace(/[^a-zA-Z\s]/g, "");
  cardNamePreview.textContent = cardName || "Jan Kowalski";
  cardNameInput.value = cardName;


  checkFormCompletion();
  
});

cardNameInput.addEventListener("click", function() {
  cardHolderSpan.classList.add("active");
})

cardNameInput.addEventListener("blur", function() {
  cardHolderSpan.classList.remove("active");
})

cardCVVInput.addEventListener("input", function () {
  let CVV = cardCVVInput.value.replace(/\D/g, "");
  if (CVV.length > 4) {
    CVV = CVV.slice(0, 4);
  }

  cvvPreview.textContent = CVV || "CVV ";
  cardCVVInput.value = CVV;
});

function updateCardDate() {
  const selectedMonth = monthSelect.value;
  const selectedYear = yearSelect.value;

  let formattedDate = "MM/YY";

  if (selectedMonth !== "Month") {
    formattedDate = `${selectedMonth}/YY`;
  }

  if (selectedYear !== "Year") {
    formattedDate = formattedDate.replace("YY", selectedYear.slice(-2));
  }

  cardDateInput.value = formattedDate;
  cardDateExpired.textContent =
    formattedDate !== "MM/YY" ? formattedDate : "MM/YY";
  cardDateInput.value = formattedDate;
  checkFormCompletion();
}
