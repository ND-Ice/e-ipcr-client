import client from "./client";

const submitResponse = (
  evaluationId,
  userId,
  coreFunctions,
  supportFunctions,
  coreFunctionsMeasure,
  supportFunctionsMeasure
) =>
  client.post(`/response/${evaluationId}`, {
    evaluationId,
    userId,
    coreFunctions,
    supportFunctions,
    coreFunctionsMeasure,
    supportFunctionsMeasure,
  });

const getEvaluationResponse = (id) => client.get(`/response/evaluation/${id}`);
const unsubmitResponse = (id) => client.delete(`/response/${id}`);

const responseApi = {
  submitResponse,
  getEvaluationResponse,
  unsubmitResponse,
};

export default responseApi;
