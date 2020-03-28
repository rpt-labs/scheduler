const getCurriculumByCohortId = require('../helpers/curriculumHelper')

exports.getCurriculumByCohortId = async (req, res) => {
  const { cohortName } = req.query;
  const cohortCurriculum = await getCurriculumByCohortId(cohortName);
  res.json({ cohortCurriculum });
};
