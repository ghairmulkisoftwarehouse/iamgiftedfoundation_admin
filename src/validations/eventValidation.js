import { combineDateTime } from "../utils/combineDateTime";

export const validateEventForm = (
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

  if (!eventDate) errors.eventDate = "Event start date is required";
  if (!eventTime) errors.eventTime = "Event start time is required";

  if (!eventEndDate) errors.eventEndDate = "Event end date is required";
  if (!eventEndTime) errors.eventEndTime = "Event end time is required";

  // Registration validation
  if (!startDate) errors.startDate = "Registration start date is required";
  if (!startTime) errors.startTime = "Registration start time is required";

  if (!endDate) errors.endDate = "Registration end date is required";
  if (!endTime) errors.endTime = "Registration end time is required";

  // Combine datetimes
  const eventStartDateTime =
    eventDate && eventTime ? combineDateTime(eventDate, eventTime) : null;

  const eventEndDateTime =
    eventEndDate && eventEndTime ? combineDateTime(eventEndDate, eventEndTime) : null;

  const startDateTime =
    startDate && startTime ? combineDateTime(startDate, startTime) : null;

  const endDateTime =
    endDate && endTime ? combineDateTime(endDate, endTime) : null;

  if (eventStartDateTime && eventEndDateTime) {
    if (new Date(eventStartDateTime) > new Date(eventEndDateTime)) {
      errors.eventEndDate = "Event end must be after event start";
      errors.eventEndTime = "Event end time cannot be earlier than start time";
    }
  }

  // Registration range validation
  if (startDateTime && endDateTime) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      errors.startDate = "Registration start cannot be later than registration end";
      errors.endDate = "Registration end cannot be earlier than registration start";
    }
  }

  // Registration vs Event Start
  if (startDateTime && eventStartDateTime) {
    if (new Date(startDateTime) > new Date(eventStartDateTime)) {
      errors.startDate = "Registration start must be before the event start";
    }
  }

  if (endDateTime && eventStartDateTime) {
    if (new Date(endDateTime) > new Date(eventStartDateTime)) {
      errors.endDate = "Registration end must be before the event start";
    }
  }

  // Category-specific validation
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