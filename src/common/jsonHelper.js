import { JOB_ATTR_SET } from "../data/constant";

export const getInnerText = (str) => {
  const arr = [];
  let i = 0;
  while (i < str.length) {
    if (str[i] === '>') {
      let j = i + 1;
      while (j < str.length) {
        if (str[j] === '<') {
          arr.push(str.substring(i + 1, j).trim());
          break;
        }
        else j++;
      }
      i = j + 1;
    }
    else i++;
  }
  return arr.filter(elem => elem.length).join(' ');
}

export const getJobPostJSON = (job) => {
  const jobPostJSON = {};
  for (const jobKey of JOB_ATTR_SET) {
    if (job.hasOwnProperty(jobKey)) {
      if (jobKey === 'description') {
          jobPostJSON[jobKey] = getInnerText(job[jobKey]);
      } else if (jobKey === 'tags') {
          jobPostJSON[jobKey] = job[jobKey].join(', ');
      } else {
          jobPostJSON[jobKey] = job[jobKey];
      }
    }
  }  
  return jobPostJSON;
}

export const filterJobPostJSONs = (jobPostJSONs, keywords) => {
  if (!(keywords && keywords instanceof Array && keywords.length > 0)) return jobPostJSONs;
  const filtereds = [];
  for (const json of jobPostJSONs) {
    const src = (json.title + json.tags + json.description).toLowerCase();
    for (const keyword of keywords) {
      if (src.indexOf(keyword.toLowerCase()) !== -1) {
        filtereds.push(json);
        break;
      }
    }
  }
  return filtereds;
}

export const getTags = (jobPostJSONs) => {
  const map = {};
  for (const json of jobPostJSONs) {
    const tags = json.tags.toLowerCase().trim().split(', ');
    for (const tag of tags) {
      map[tag] = map.hasOwnProperty(tag) ? map[tag] + 1 : 1;
    }
  }
  // for (const json of jobPostJSONs) {
  //   const jd = json.description.toLowerCase().trim().replace(/[!@#$%^&*,.;:?^/]/g, '').split(' ');
  //   for (const word of jd) {
  //     map[word] = map.hasOwnProperty(word) ? map[word] + 1 : 1;
  //   }
  // }
  return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 16).map(elem => elem[0]);
}