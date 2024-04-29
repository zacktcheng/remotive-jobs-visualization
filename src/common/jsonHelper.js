import { JOB_ATTR_SET, SPECIAL_CHAR_REGEX, SENIORITIES, POP_DEV_ROLES } from "../data/constant";

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
  return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 8).map(elem => elem[0]);
}

export const toWordArray = text => text.trim().replaceAll(SPECIAL_CHAR_REGEX, ' ').split(' ').filter(elem => elem);

export const sortTrimJson = (jsons, maxSize) => {
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

export const getPieChartData = (jsons, keywords, maxSize = 8) => {
  const obj = keywords.reduce((accu, curr) => { return { ...accu, [curr]: 0 } }, {});
  for (const json of jsons) {
    const src = `${json.title} ${json.tags} ${json.description}`.toLowerCase();
    const set = new Set(toWordArray(src));
    for (const keyword of keywords) {
      if (set.has(keyword)) obj[keyword] += 1;
    }
  }
  return sortTrimJson(obj, maxSize);
}

export const getDefaultExpChartData = (keywords = ['frequency']) => {
  return SENIORITIES.map(seniority => {
    return keywords.reduce((accu, curr) => {
      return { ...accu, [curr]: 0 }
    }, { seniority });
  });
}

export const getDefaultRoleChartData = (keywords = ['frequency']) => {
  return POP_DEV_ROLES.map(role => {
    return keywords.reduce((accu, curr) => {
      return { ...accu, [curr]: 0 }
    }, { role });
  });
}

export const getExpChartData = (jsons, keywords) => {
  const data = getDefaultExpChartData(keywords);
  for (const json of jsons) {
    const src = `${json.title} ${json.tags} ${json.description}`.toLowerCase();
    const set = new Set(toWordArray(src));
    if (set.has('jr') || set.has('junior')) {
      const obj = data.find(elem => elem.seniority === 'jr');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('sr') || set.has('senior')) {
      const obj = data.find(elem => elem.seniority === 'sr');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('lead') || set.has('manager')) {
      const obj = data.find(elem => elem.seniority ===  'ld/mgr');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('engineer') || set.has('developer')) {
      const obj = data.find(elem => elem.seniority === 'md');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    }
  }
  return data;
}

export const getRoleChartData = (jsons, keywords) => {
  const data = getDefaultRoleChartData(keywords);
  for (const json of jsons) {
    const src = `${json.title} ${json.tags} ${json.description}`.toLowerCase();
    const set = new Set(toWordArray(src));
    if (set.has('frontend') || set.has('front-end')) {
      const obj = data.find(elem => elem.role === 'frontend');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('backend') || set.has('back-end')) {
      const obj = data.find(elem => elem.role === 'backend');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('ios') || set.has('andriod') || set.has('mobile')) {
      const obj = data.find(elem => elem.role ===  'mobile');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else if (set.has('devops') || set.has('sre') || set.has('reliability')) {
      const obj = data.find(elem => elem.role === 'devops');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    } else {
      const obj = data.find(elem => elem.role === 'fullstack');
      for (const keyword of keywords) if (set.has(keyword)) obj[keyword] += 1;
    }
  }
  return data;
}