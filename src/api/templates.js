import client from "./client";

const getTemplates = () => client.get("/templates");

const templatesApi = { getTemplates };
export default templatesApi;
