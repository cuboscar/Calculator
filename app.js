/**
 * 
 * Listen for Submit Button
 * 
 */
submitBttn = document.getElementById("loan-form");
submitBttn.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "block";
    setTimeout(calculateResults, 2000);

})

function calculateResults(e) {
    // e.preventDefault();
    const loanAmountUI = document.getElementById("amount");
    const interestRateUI = document.getElementById("interest");
    const yearsUI = document.getElementById("years");
    console.log(loanAmountUI.value, interestRateUI.value, yearsUI.value);

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interests")
    //Calculate Values
    const principal = parseFloat(loanAmountUI.value);
    const calculatedInterests = parseFloat(interestRateUI.value) / 100 / 12;
    const calculatePayments = parseFloat(yearsUI.value) * 12;

    //Compute Monthly Payments 
    const x = Math.pow(1 + calculatedInterests, calculatePayments);
    const monthly = (principal * x * calculatedInterests) / (x - 1);

    //validate that the value is not Infinite
    if (isFinite(monthly)) {
        console.log(monthly);
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = (monthly * calculatePayments - principal).toFixed(2);
        document.getElementById("results").style.display = "block";
        document.getElementById("loader").style.display = "none";
    }
    else {
        manageError('Error, check your numbers :)')
    }

}

function manageError(errorMsg) {
    //get Node where the error windows will be displayed
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    //createDiv to show error 
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.id = "customAlert"
    //create text node and append it to div 
    const errorTextNode = document.createTextNode(errorMsg);
    errorDiv.appendChild(errorTextNode);
    //Insert error Msg above heading 
    card.insertBefore(errorDiv, heading)
    console.log(errorDiv);
    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "none";
    window.setTimeout(clearError, 3000);

}

function clearError() {
    document.getElementById("customAlert").remove();
}

let resetBtn = document.getElementById("reset");
resetBtn.addEventListener('click', function (e) {
    console.log("hola")
    location.reload();
})