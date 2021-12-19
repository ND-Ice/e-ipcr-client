export default function getColorMark(marks) {
  const remarks = marks.toLowerCase();
  if (remarks === "excellent") return "#16A34A";
  else if (remarks === "very satisfactory") return "#22C55E";
  else if (remarks === "satisfactory") return "#737373";
  else if (remarks === "poor") return "#F97316";
  else return "#EF4444";
}
