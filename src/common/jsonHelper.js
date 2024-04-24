import { JOB_ATTR_SET, SPECIAL_CHAR_REGEX } from "../data/constant";

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
  const filtereds = [];
  for (const json of jobPostJSONs) {
    const src = `${json.title} ${json.tags} ${json.description}`.toLowerCase();
    let hasKeyword = true;
    for (const keyword of keywords) {
      if (src.indexOf(keyword.toLowerCase()) === -1) {
        hasKeyword = false;
        break;
      }
    }
    if (hasKeyword) filtereds.push(json);
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

export const toWordArray = text => text.replaceAll(SPECIAL_CHAR_REGEX, ' ').split(' ').filter(elem => elem !== '');

export const sortTrimJSONs = (jsons, maxSize) => {
  const sortedTrimmedFreqObj = Object.entries(jsons)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxSize)
    .reduce((accu, curr) => {
      if (curr[1] === 0) return accu;
      return {
        ...accu,
        [curr[0]]: curr[1]
      };
    }, {});
    return sortedTrimmedFreqObj;
}

export const getHighFreqJSONs = (jsons, keywords, maxSize = 12) => {
  const obj = keywords.reduce((accu, curr) => { return { ...accu, [curr]: 0 } }, {});
  for (const json of jsons) {
    const src = `${json.title} ${json.tags} ${json.description}`.toLowerCase();
    const set = new Set(toWordArray(src));
    for (const keyword of keywords) {
      if (set.has(keyword)) obj[keyword] += 1;
    }
  }
  return sortTrimJSONs(obj, maxSize);
}

