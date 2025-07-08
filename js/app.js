// Get the bill amount, tip percentage, and number of people from the input fields
const billAmount = document.getElementById("bill");
const tipPercentage = document.querySelectorAll(".tip-option");
const numberOfPeople = document.getElementById("people");
const customTip = document.getElementById("custom-tip");

// Get the tip amount and total amount elements
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

// Get the reset button
const resetButton = document.getElementById("reset-btn");

// Set the default tip percentage to 0
let tipValue = 0.15;

// Add event listeners to the tip percentage buttons
tipPercentage.forEach((tip) => {
    tip.addEventListener("click", (e) => {
        // Remove the selected class from all tip percentage buttons
        tipPercentage.forEach((tip) => {
            tip.classList.remove("selected");
        });

        // Add the selected class to the clicked tip percentage button
        e.target.classList.add("selected");

        // Set the tip value to the clicked tip percentage
        tipValue = parseFloat(e.target.dataset.tip) / 100;

        // Calculate the tip and total amount
        calculateTip();
    });
});

// Add event listener to the custom tip input
customTip.addEventListener("input", () => {
    // Remove the active class from all tip percentage buttons
    tipPercentage.forEach((tip) => {
        tip.classList.remove("selected");
    });

    // Set the tip value to the custom tip value
    tipValue = parseFloat(customTip.value) / 100;

    // Calculate the tip and total amount
    calculateTip();
});

// Add event listener to the bill amount input
billAmount.addEventListener("input", calculateTip);

// Add event listener to the number of people input
numberOfPeople.addEventListener("input", calculateTip);

// Function to calculate the tip and total amount
function calculateTip() {
    // Get the bill amount, tip percentage, and number of people from the input fields
    const bill = parseFloat(billAmount.value);
    const people = parseInt(numberOfPeople.value);

    // Validate the inputs
    if (isNaN(bill) || isNaN(people) || people === 0) {
        return;
    }

    // Calculate the tip amount and total amount per person
    const tip = (bill * tipValue) / people;
    const total = (bill + bill * tipValue) / people;

    // Update the tip amount and total amount elements
    tipAmount.innerText = `$${tip.toFixed(2)}`;
    totalAmount.innerText = `$${total.toFixed(2)}`;
}

// Add event listener to the reset button
resetButton.addEventListener("click", () => {
    // Reset the bill amount, tip percentage, and number of people
    billAmount.value = "";
    numberOfPeople.value = "";
    customTip.value = "";

    // Reset the tip amount and total amount
    tipAmount.innerText = "$0.00";
    totalAmount.innerText = "$0.00";

    // Reset the tip value
    tipValue = 0.15;

    // Remove the selected class from all tip percentage buttons
    tipPercentage.forEach((tip) => {
        tip.classList.remove("selected");
    });

    // Add the selected class to the 15% tip percentage button
    tipPercentage[2].classList.add("selected");
});