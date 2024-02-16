const { Project, User} = require('../models/index')


const authorization = async (req, res, next) => {
  try {
    const { userId, email } = req.loginInfo;
    // console.log(role, authorId, email);
    const { id } = req.params;

    const user = await User.findOne({
      where: { id: userId },
    });
    // console.log(staff);
    if (!user) {
      throw { name: "Forbidden" };
    }

    const projectFound = await Project.findByPk(id);
    // console.log(projectFound);
    if (!projectFound) {
      throw { name: "NotFound" };
    }
    if (user.id !== projectFound.userId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authorization };
