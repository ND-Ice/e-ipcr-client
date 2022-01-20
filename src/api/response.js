import client from "./client";

const submitResponse = (
  evaluationId,
  userId,
  user,
  templateId,
  coreFunctions,
  supportFunctions,
  coreFunctionsMeasure,
  supportFunctionsMeasure,
  attachments,
  average,
  signature,
  createdBy,
  hrSignature
) => {
  let data = new FormData();
  data.append("evaluationId", evaluationId);
  data.append("userId", userId);
  data.append("user", JSON.stringify(user));
  data.append("templateId", templateId);
  data.append("coreFunctionsMeasure", coreFunctionsMeasure);
  data.append("supportFunctionsMeasure", supportFunctionsMeasure);
  data.append("coreFunctions", JSON.stringify(coreFunctions));
  data.append("supportFunctions", JSON.stringify(supportFunctions));
  data.append("average", average);
  data.append("userSignature", signature);
  data.append("createdBy", JSON.stringify(createdBy));
  data.append("hrSignature", hrSignature);

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
