import { getJobPostJSON } from "./jsonHelper";

export const getJobPostJSONs = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    // Do something
    return;
  }
  const json = await response.json();
  if (!(json.hasOwnProperty('jobs') && json.jobs.length > 0)) {
    // Do something
    return;
  }
  const jobPostJSONs = [];
  for (const rawJobPostJSON of json.jobs) jobPostJSONs.push(getJobPostJSON(rawJobPostJSON));
  return jobPostJSONs;
}
