function shortNumberFormat(number = 0) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const precision = 1;
  
    if(number === 0) return 0;
    // Handle special cases
    if (number < 1000) {
        return number?.toFixed();
    }
    if (number >= 1e15) {
        return '∞';
    }
  
    const exponent = Math.floor(Math.log10(number));
    const suffixIndex = Math.floor(exponent / 3);
    const suffix = suffixes[suffixIndex];
    const value = number / Math.pow(10, suffixIndex * 3);
  
    return `${value.toFixed(precision)}${suffix}`;
}

export default shortNumberFormat;