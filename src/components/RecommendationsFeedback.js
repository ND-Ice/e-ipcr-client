import React from "react";

export default function RecommendationsFeedback({ recommendations }) {
  return (
    <div className="mt-4">
      <h6 className="fw-bold text-uppercase">Recommendations</h6>
      <p>{recommendations?.title}</p>
      <ul>
        {recommendations?.list?.map((recommendation) => (
          <li key={recommendation?.id}>{recommendation?.item}</li>
        ))}
      </ul>
    </div>
  );
}
