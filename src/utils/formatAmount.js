function formatAmount(number = 0) {
    let numberStr = number.toString();
  
    const parts = numberStr.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] || "";

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (decimalPart) {
        return integerPart + "." + decimalPart;
    } else {
        return integerPart;
    }
}

export default formatAmount;