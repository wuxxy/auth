export default (password: string): number => {
  // test for spaces
  if (password.indexOf(" ") !== -1) {
    return 0;
  }

  const regex = {
    digit: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    special: /[^a-zA-Z\d]/,
  };

  let score = 0;

  if (password.length < 8 || password.length > 32) {
    score = 0;
  } else {
    if (regex.digit.test(password)) {
      score++;
    }
    if (regex.lowercase.test(password)) {
      score++;
    }
    if (regex.uppercase.test(password)) {
      score++;
    }
    if (regex.special.test(password)) {
      score++;
    }
  }

  return score;
};
