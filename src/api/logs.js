import client from "./client";

const addEvaluationLogs = (
  evaluationId,
  actionCreator,
  actionMessage,
  actionTarget
) =>
  client.post("/logs", {
    evaluationId,
    actionCreator,
    actionMessage,
    actionTarget,
  });

const logsApi = { addEvaluationLogs };
export default logsApi;
