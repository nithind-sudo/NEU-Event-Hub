const EventService = require("../services/EventService");
const eventService = new EventService();

exports.getEventInfo = async (req, res) => {
  const { event_id } = req.params;
  try {
    const eventInfo = await eventService.getEventInfo(event_id);
    res.status(200).send(eventInfo);
  } catch (e) {
    res.status(400).send({ message: "400 Bad Request", error: error.message });
  }
};

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
    EventService.createEvent(payload)
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

exports.deleteEventInfo = async (req, res) => {
  const { event_id } = req.params;
  console.log("Event-id input : ", event_id);
  try {
    const deletedCnt = await eventService.deleteUser(event_id);
    // Sample successful o/p : { acknowledged: true, deletedCount: 1 }
    console.log("Deleted Row count : ", deletedCnt);
    if (deletedCnt.deletedCount === 1) {
      res.status(204).send({});
    } else {
      res.status(400).send({ message: "400 Bad Request" });
    }
  } catch (e) {
    res
      .status(500)
      .send({ message: "500 Internal Server Error", message: e.message });
  }
};

exports.patchEventInfo = async (req, res) => {};
