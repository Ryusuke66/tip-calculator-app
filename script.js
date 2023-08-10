let form = document.querySelector("form"),
    bill = document.getElementById("bill"),
    error = document.querySelectorAll(".error"),
    customTip = document.getElementById("custom"),
    people = document.getElementById("people"),
    tipPerPerson = document.querySelector(".tip .num"),
    total = document.querySelector(".total .num"),
    resetButton = document.querySelector("button");
    
form.onchange = () => {
    let valid = false;
    if (bill.value > 500000) {
        bill.style.border = "2px solid hsl(0, 88%, 66%)";
        error[0].classList.add("active");
        error[0].textContent = "The number is too long";
        valid = false;
    } else if (bill.value === "") {
        bill.style.border = "2px solid hsl(0, 88%, 66%)";
        error[0].classList.add("active");
        error[0].textContent = "Can't be empty";
        valid = false;
    } else {
        bill.style.border = "none";
        error[0].classList.remove('active');
    }

    if (people.value === "") {
        people.style.border = "2px solid hsl(0, 88%, 66%)";
        error[1].classList.add("active");
        error[1].textContent = "Can't be empty";
        valid = false;
    } else {
        people.style.border = "none";
        error[1].classList.remove('active');
    }

    let tipAmount = 0;
    let checkedButton = document.querySelector('input[type=radio]:checked');
    if (checkedButton) {
        customTip.onfocus = () => {
            if(checkedButton.checked) checkedButton.checked = false;
        }
        tipAmount = document.querySelector("input[type=radio]:checked ~ span");
        customTip.value = "";
    }

    if (bill.value <= 500000 && people.value !== '' && (checkedButton || customTip)) {
        valid = true;
    }

    if (valid) {
        console.log(valid);

        if (bill.value && checkedButton && people.value) {
            tipPerPerson.textContent = `$${(Math.floor((+bill.value * (+tipAmount.dataset.value / 100) / people.value)*100)/100).toFixed(2)}`;
            total.textContent = `$${(Math.floor((+bill.value + (+bill.value * (+tipAmount.dataset.value / 100))) * 100 / people.value) / 100).toFixed(2)}`;
            resetButton.disabled = false;
            resetButton.addEventListener("click", () => {
                checkedButton.checked = false;
                tipPerPerson.textContent = `$0.00`;
                total.textContent = `$0.00`;
                bill.value = '';
                people.value = '';
            })
        } else if (bill.value && customTip.value && people.value) {
            tipPerPerson.textContent = `$${(Math.floor((+bill.value * (customTip.value / 100) / people.value)*100)/100).toFixed(2)}`;
            total.textContent = `$${(Math.floor((+bill.value + (+bill.value * (customTip.value / 100))) * 100 / people.value) / 100).toFixed(2)}`;
            resetButton.disabled = false;
            resetButton.addEventListener("click", () => {
                tipPerPerson.textContent = `$0.00`;
                total.textContent = `$0.00`;
                bill.value = '';
                people.value = '';
                customTip.value = '';
            })
        }

        
    }

}
