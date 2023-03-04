export default (str: string): boolean => {
  // define the regular expression pattern
  const pattern = /[^a-zA-Z0-9\s]/g;

  // test the string against the regular expression pattern
  return pattern.test(str);
};
