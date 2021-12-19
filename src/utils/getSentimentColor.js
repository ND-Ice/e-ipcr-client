export default function getSentimentColor(sentiment) {
  const sentimentValue = sentiment.toLowerCase();

  if (sentimentValue === "positive") return "#16A34A";
  else if (sentimentValue === "neutral") return "#737373";
  else return "#EF4444";
}
