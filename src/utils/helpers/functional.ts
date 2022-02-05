export const noop = () => {};

/**
 * Checks if the value passed is an object
 */
export const isObject = (value: any): value is object =>
  value && typeof value === "object" && !Array.isArray(value);

/**
 * Checks if the values passed is array
 */
export const isArray = (value: any): value is any[] =>
  value && typeof value === "object" && Array.isArray(value);

/**
 * Checks if value is null or empty
 */
export const isNullOrEmpty = (value: any) =>
  !value ||
  (isArray(value) && value.length === 0) ||
  (isObject(value) && Object.entries(value).length === 0);

export const shuffleArray = (arr: any) => {
  const array = [...arr];

  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
