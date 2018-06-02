function isPalindrome(str) {
  const cleared = str.toLowerCase().replace(/\s|’|,/g, '');

  return (
    cleared ===
    cleared
      .split('')
      .reverse()
      .join('')
  );
}

var x0 = isPalindrome('лосось шагал по небу'); //  false
var x1 = isPalindrome('А роза упала на лапу Азора'); // true
var x2 = isPalindrome('Madam, I’m Adam'); // true;
