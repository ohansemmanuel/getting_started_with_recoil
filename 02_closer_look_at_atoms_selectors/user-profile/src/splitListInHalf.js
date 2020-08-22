export const splitListInHalf = (list = []) => {
  if (!list.length) {
    return [[], []];
  }

  const half = Math.ceil(list.length / 2);

  const firstHalf = list.slice(0, half);
  const secondHalf = list.slice(-half);

  return [firstHalf, secondHalf];
};
