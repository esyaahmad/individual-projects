
const authorization = async (req, res, next) => {

    try {
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authorization}