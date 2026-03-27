import { combineDateTime } from "../utils/combineDateTime";

export const validateUpdateEventForm = (
  data,
  eventDate,
  eventTime,
  eventEndDate,
  eventEndTime,
  startDate,
  startTime,
  endDate,
  endTime
) => {
  const errors = {};

  // Title (optional)
  if (data.title?.trim() && data.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  // Capacity (optional)
  if (data.capacity !== null && data.capacity !== "" && data.capacity !== undefined) {
    const capacityNumber = Number(data.capacity);
    if (Number.isNaN(capacityNumber)) {
      errors.capacity = "Capacity must be a number";
    } else if (capacityNumber <= 0) {
      errors.capacity = "Capacity must be greater than 0";
    }
  }

  // Combine datetimes safely
  const eventStartDateTime =
    eventDate && eventTime ? combineDateTime(eventDate, eventTime) : null;

  const eventEndDateTime =
    eventEndDate && eventEndTime ? combineDateTime(eventEndDate, eventEndTime) : null;

  const startDateTime =
    startDate && startTime ? combineDateTime(startDate, startTime) : null;

  const endDateTime =
    endDate && endTime ? combineDateTime(endDate, endTime) : null;

  // ✅ Event range validation
  if (eventStartDateTime && eventEndDateTime) {
    if (new Date(eventStartDateTime) > new Date(eventEndDateTime)) {
      errors.eventEndDate = "Event end must be after event start";
      errors.eventEndTime = "Event end time cannot be earlier than start time";
    }
  }

  // ✅ Registration range validation
  if (startDateTime && endDateTime) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      errors.startDate = "Registration start cannot be later than registration end";
      errors.endDate = "Registration end cannot be earlier than registration start";
    }
  }

  // ✅ Registration vs Event
  if (startDateTime && eventStartDateTime) {
    if (new Date(startDateTime) > new Date(eventStartDateTime)) {
      errors.startDate = "Registration start must be before the event date";
    }
  }

  if (endDateTime && eventStartDateTime) {
    if (new Date(endDateTime) > new Date(eventStartDateTime)) {
      errors.endDate = "Registration end must be before the event date";
    }
  }

  // const isProgramCategory =
  //   data.eventType === "program" && data.category?.title === "Program";

  // if (isProgramCategory) {
  //   if (!data.piller?.trim()) {
  //     errors.piller = "Piller is required for Program category";
  //   }
  //   if (!data.program?.trim()) {
  //     errors.program = "Program is required";
  //   }
  // }

  return errors;
};