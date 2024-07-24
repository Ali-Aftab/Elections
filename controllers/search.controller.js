const formatData = (votingInfoParam) => {
  const votingInfo = { ...votingInfoParam };
  const { date, source } = votingInfo;

  votingInfo.date = formatOneDate(date);
  votingInfo.source.date = formatOneDate(source.date);
  source.isOnline = source.type === "website" ? true : false;

  const districtDivisions = votingInfo["district-divisions"];

  for (let j = 0; j < districtDivisions.length; j++) {
    const curDivision = districtDivisions[j];
    const votingMethods = curDivision["voting-methods"];
    const registerMethod = curDivision["voter-registration-methods"];
    for (let k = 0; k < votingMethods.length; k++) {
      const curMethod = votingMethods[k];
      if (curMethod.start) {
        const updateDate = formatOneDate(curMethod.start);
        curMethod.start = updateDate;
      }
      if (curMethod.end) {
        const updateDate = formatOneDate(curMethod.end);
        curMethod.deadline = updateDate;
      }
      if (curMethod["ballot-request-deadline-received"]) {
        const deadline = formatOneDate(
          curMethod["ballot-request-deadline-received"]
        );
        curMethod.deadline = deadline;
      }
      if (curMethod.type) {
        curMethod.type = curMethod.type.replace(/-/g, " ");
      }
      if (curMethod["ballot-request-form-url"]) {
        curMethod.url = curMethod["ballot-request-form-url"];
      }
    }
    for (let k = 0; k < registerMethod.length; k++) {
      const oneMethod = registerMethod[k];
      if (oneMethod["deadline-postmarked"]) {
        const updateDate = formatOneDate(oneMethod["deadline-postmarked"]);
        oneMethod.deadline = updateDate;
      }
      if (oneMethod["deadline-online"]) {
        const updateDate = formatOneDate(oneMethod["deadline-online"]);
        oneMethod.deadline = updateDate;
      }
      if (oneMethod.end) {
        const updateDate = formatOneDate(oneMethod.end);
        oneMethod.deadline = updateDate;
      }
      if (oneMethod.type) {
        oneMethod.type = oneMethod.type.replace(/-/g, " ");
      }
      if (oneMethod["registration-form-url"]) {
        oneMethod.url = oneMethod["registration-form-url"];
      }
    }
  }
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

module.exports = {
  formatData,
};
