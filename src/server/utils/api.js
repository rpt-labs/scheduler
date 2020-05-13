const axios = require('axios');

const { GLEARN_BASE_URL, GLEARN_AUTH_TOKEN } = process.env;

const getCurriculum = async (cohortId) => {
  const url = `${GLEARN_BASE_URL}/api/v1/cohorts/${cohortId}/curriculum`;
  try {
    const response = await axios({
      method: 'get',
      url,
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `${GLEARN_AUTH_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.getCurriculum = getCurriculum;
