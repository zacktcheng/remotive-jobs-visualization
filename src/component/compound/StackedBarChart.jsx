import React from "react";
import { Context } from "./Content";
import Section from "../base/Section";
import StackedBarChartSvg from "../chartSvg/StackedBarChartSvg";
import BarChartSvg from "../chartSvg/BarChartSvg";
import Toggles from "../base/Toggles";
import { toWordArray } from "../../common/jsonHelper";
import { SENIORITIES } from "../../data/constant";

const getStackedBarChartData = (jsons, keywords) => {
  const data = SENIORITIES.map(seniority => {
    return keywords.reduce((accu, curr) => {
      return { ...accu, [curr]: 0 }
    }, { seniority });
  });
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

const StackedBarChart = () => {

  const { tags, jobPostJSONs, stackedBarChartData, setStackedBarChartData } = React.useContext(Context);
  const [toggleds, setToggleds] = React.useState(() => []);
  const handleChange = (event, nextToggleds) => {
    setToggleds(nextToggleds);
    const data = getStackedBarChartData(jobPostJSONs, nextToggleds);
    setStackedBarChartData(data);
    console.log(data);
  }

  const isDataReady = stackedBarChartData.length > 0 && Object.keys(stackedBarChartData[0]) > 1;

  return (
    <Section >
      <Toggles btnTxts={tags} handleChange={handleChange} toggleds={toggleds} />
      <StackedBarChartSvg data={stackedBarChartData} dimension={{ x: 400, y: 400 }} />
      <BarChartSvg data={[{ language: 'F#', value: 1 }, { language: 'Java', value: 40 }, {language: 'Python', value: 60}]} dimension={{ x: 400, y: 400}} />
    </Section>
  );
}

export default StackedBarChart;