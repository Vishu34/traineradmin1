exports.sendAllStudentsController = async (req, res) => {
  try {
    const { title, message, banner } = req.body;
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal server error to send notification",
      error,
    });
  }
};
