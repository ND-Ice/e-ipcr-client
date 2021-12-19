export default function getConcatenated(str, limit) {
  if (str.length > limit) return str.slice(0, limit) + "...";
  else return str;
}
