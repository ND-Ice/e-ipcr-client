const getRemarks = (rate) => {
  const rating = parseInt(rate);
  if (!rating) return;
  if (rating === 5) return "Outstanding";
  if (rating >= 4) return "Very Satisfactory";
  if (rating >= 3) return "Satisfactory";
  if (rating >= 2) return "Unsatisfactory";
  if (rating >= 1) return "Poor";
};

export default getRemarks;
