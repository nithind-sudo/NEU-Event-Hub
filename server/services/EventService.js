const Event = require("../models/events");

class EventService {
  async createUser(eventPayload) {
    const event = new Event(eventPayload);
    return await event.save();
  }

  async getEvent(event_id) {
    return await Event.find({ event_id: event_id }).exec();
  }

  async deleteEvent(event_id) {
    return await Event.deleteOne({ event_id: event_id }).exec();
  }

  async patchEvent(event_id, payload) {
    // console.log("payload to update the patch  : ", payload)
    return await Event.findOneAndUpdate({ event_id }, { ...payload });
  }
}
