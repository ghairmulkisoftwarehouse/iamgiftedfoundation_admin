import { combineDateTime } from "../utils/combineDateTime";

export const validateEventForm = (
  data,
  eventDate,
  eventTime,
  startDate,
  startTime,
  endDate,
  endTime
) => {
  const errors = {};

  if (!data.title?.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!data.category) {
    errors.category = "Category is required";
  }

  if (data.capacity !== null && data.capacity !== "") {
    const capacityNumber = Number(data.capacity);
    if (Number.isNaN(capacityNumber)) {
      errors.capacity = "Capacity must be a number";
    } else if (capacityNumber <= 0) {
      errors.capacity = "Capacity must be greater than 0";
    }
  }

  if (!eventDate) errors.eventDate = "Event date is required";
  if (!eventTime) errors.eventTime = "Event time is required";

  if (!startDate) errors.startDate = "Start date is required";
  if (!startTime) errors.startTime = "Start time is required";

  if (!endDate) errors.endDate = "End date is required";
  if (!endTime) errors.endTime = "End time is required";

  const startDateTime = startDate && startTime ? combineDateTime(startDate, startTime) : null;
  const endDateTime = endDate && endTime ? combineDateTime(endDate, endTime) : null;
  const eventDateTime = eventDate && eventTime ? combineDateTime(eventDate, eventTime) : null;

  if (startDateTime && endDateTime) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      errors.startDate = "Registration start cannot be later than registration end";
      errors.endDate = "Registration end cannot be earlier than registration start";
    }
  }

  if (startDateTime && eventDateTime) {
    if (new Date(startDateTime) > new Date(eventDateTime)) {
      errors.startDate = "Registration start must be before the event date";
    }
  }

  if (endDateTime && eventDateTime) {
    if (new Date(endDateTime) > new Date(eventDateTime)) {
      errors.endDate = "Registration end must be before the event date";
    }
  }

  const isProgramCategory = data.category?.title === "Program";

  if (isProgramCategory) {
    if (!data.piller) {
      errors.piller = "Piller is required for Program category";
    }
    if (!data.program) {
      errors.program = "Program is required";
    }
  }

  return errors;
};
