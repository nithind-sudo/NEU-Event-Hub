const UserService = require("../services/UserService");
const Event = require("../models/events");

class EventService {
  constructor() {
    this.userService = new UserService();
  }

  async createEvent(eventPayload) {
    const { organizer, ...restPayload } = eventPayload;
    const user = await this.userService.getUserById(organizer);
    if (!user) {
      throw new Error("User not found");
    }
    
    const event = new Event({
      ...restPayload,
      organizer : user[0]._id,
    });

    return await event.save();
  }

  async getEventInfo(event_id) {
    return await Event.find({ event_id }).exec();
  }

  async deleteEvent(event_id) {
    return await Event.deleteOne({ event_id }).exec();
  }

  async patchEvent(event_id, payload) {
    // console.log("payload to update the patch  : ", payload)
    return await Event.findOneAndUpdate({ event_id }, { ...payload });
  }
}

module.exports = EventService;
