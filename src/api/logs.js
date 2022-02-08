import client from "./client";

const addEvaluationLogs = (
  evaluatonId,
  actionCreator,
  actionMessage,
  actionTarget
) =>
  client.post("/logs", {
    evaluatonId,
    actionCreator,
    actionMessage,
    actionTarget,
  });

const logsApi = { addEvaluationLogs };
export default logsApi;
