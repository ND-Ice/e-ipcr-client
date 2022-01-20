import client from "./client";

const getTemplates = () => client.get("/templates");
const analyzeSentiment = (accomplishment) =>
  client.post("/templates/analyzer", { accomplishment });

const templatesApi = { getTemplates, analyzeSentiment };
export default templatesApi;
