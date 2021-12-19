export default function cardLimit(arr, limit) {
  if (arr?.length > limit) return arr.slice(0, limit);
  return arr;
}
