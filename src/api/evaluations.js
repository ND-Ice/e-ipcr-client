import client from "./client";

const getEvaluations = () => client.get("/evaluations");
const getEvaluationsDetails = (id) => client.get(`/evaluations/${id}`);

const evaluationsApi = {
  getEvaluations,
  getEvaluationsDetails,
};

export default evaluationsApi;
