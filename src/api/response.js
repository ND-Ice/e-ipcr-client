import client from "./client";

const submitResponse = (
  evaluationId,
  userId,
  coreFunctions,
  supportFunctions,
  coreFunctionsMeasure,
  supportFunctionsMeasure,
  attachments
) => {
  let data = new FormData();
  data.append("evaluationId", evaluationId);
  data.append("userId", userId);
  data.append("coreFunctionsMeasure", coreFunctionsMeasure);
  data.append("supportFunctionsMeasure", supportFunctionsMeasure);
  data.append("coreFunctions", JSON.stringify(coreFunctions));
  data.append("supportFunctions", JSON.stringify(supportFunctions));

  attachments.forEach((file) => data.append("files", file));

  return client.post("/response", data);
};

const getEvaluationResponse = (id) => client.get(`/response/evaluation/${id}`);
const unsubmitResponse = (id) => client.delete(`/response/${id}`);

const responseApi = {
  submitResponse,
  getEvaluationResponse,
  unsubmitResponse,
};

export default responseApi;
