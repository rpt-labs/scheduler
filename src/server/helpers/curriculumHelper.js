const getCurriculum = require('../utils/api');
const cohortMap = require('../../../config/cohortMap');

const getCurriculumByCohortId = async cohortName => {
  const cohortId = cohortMap[cohortName];
  try {
    const response = await getCurriculum(cohortId);
    return response;
  } catch (error) {
    console.log(`Error checking branches for ${cohortName} with ID ${cohortId}`);
    return error;
  }
};

module.exports = getCurriculumByCohortId;
