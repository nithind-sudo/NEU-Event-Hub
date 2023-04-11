const EventService = require('../services/EventService');

exports.getEventInfo = async (req, res) => {};

exports.createEvent = async (req, res) => {
  const { title, description, date, startTime, endTime, organizer, category } =
    req.body;
  try {
    const payload = {
      title,
      description,
      date,
      startTime,
      endTime,
      organizer,
      category,
    };
    console.log(payload);
    EventService
      .createEvent(payload)
      .then((eventRow) => {
        res.status(201).send({
          eventRow,
          success: true,
        });
      })
      .catch((e) => {
        console.log(e.message);
        res
          .status(500)
          .send({ message: "500 Internal Server Error", error: e.message });
      });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: "400 Bad Request", error: error.message });
  }
};

exports.deleteEventInfo = async (req, res) => {};

exports.patchEventInfo = async (req, res) => {};
