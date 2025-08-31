const roman = (num: number): string => {
    if (num === 1) return "I";
    if (num === 2) return "II";
    if (num === 3) return "III";
    if (num === 4) return "IV";
    if (num === 5) return "V";
    return num.toString();
  };
  
  export default roman;