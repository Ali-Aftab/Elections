const formatData = (votingInfoParam) => {
  let votingInfo = { ...votingInfoParam };
  const { date, source } = votingInfo;
  votingInfo.date = formatOneDate(date);
  votingInfo.source.date = formatOneDate(source.date);
  votingInfo = recursiveToCamel(votingInfo);
  console.log(vo);
  const districtDivisions = votingInfo["district-divisions"];

  source.isOnline = source.type === "website" ? true : false;

  for (let j = 0; j < districtDivisions.length; j++) {
    const curDivision = districtDivisions[j];
    const votingMethods = curDivision.votingMethods;
    const registerMethod = curDivision.voterRegistrationMethods;
    for (let k = 0; k < votingMethods.length; k++) {
      const curMethod = votingMethods[k];
      if (curMethod.start) {
        const updateDate = formatOneDate(curMethod.start);
        curMethod.start = updateDate;
      }
      if (curMethod.end) {
        const updateDate = formatOneDate(curMethod.end);
        curMethod.end = updateDate;
      }
      if (curMethod["ballotRequestDeadlineReceived"]) {
        const deadline = formatOneDate(
          curMethod["ballotRequestDeadlineReceived"]
        );
        curMethod.deadline = deadline;
      }
    }
    for (let k = 0; k < registerMethod.length; k++) {
      const oneMethod = registerMethod[k];
      if (oneMethod.deadlinePostmarked) {
        const updateDate = formatOneDate(oneMethod.deadlinePostmarked);
        oneMethod.deadline = updateDate;
      }
      if (oneMethod["deadlineOnline"]) {
        const updateDate = formatOneDate(oneMethod["deadlineOnline"]);
        oneMethod.deadline = updateDate;
      }
      if (oneMethod["end"]) {
        const updateDate = formatOneDate(oneMethod["end"]);
        oneMethod["end"] = updateDate;
      }
      if (oneMethod.type) {
        oneMethod.type = oneMethod.type.replace(/-/g, " ");
      }
    }
    curDivision.votingMethods = votingMethods;
    curDivision.registerMethod = registerMethod;
  }

  //   curDivision.districtDivisions = districtDivisions;
  //   Handlebars.registerHelper("camelCase", (name, variable));
  votingInfo = recursiveToCamel(votingInfo);
  return votingInfo;
};

const formatOneDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const newDate = new Date(date);
  return newDate.toLocaleDateString(undefined, options);
};

// handle Code
const recursiveToCamel = (item) => {
  if (Array.isArray(item)) {
    return item.map((el) => recursiveToCamel(el));
  } else if (typeof item === "function" || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key.replace(/([-_][a-z])/gi, (c) => c.toUpperCase().replace(/[-_]/g, "")),
      recursiveToCamel(value),
    ])
  );
};

module.exports = {
  formatData,
};
