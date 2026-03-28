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

  if (eventStartDateTime && eventEndDateTime) {
    if (new Date(eventStartDateTime) > new Date(eventEndDateTime)) {
      errors.eventEndDate = "Event end must be after event start";
      errors.eventEndTime = "Event end time cannot be earlier than start time";
    }
  }

  if (startDateTime && endDateTime) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      errors.startDate = "Registration start cannot be later than registration end";
      errors.endDate = "Registration end cannot be earlier than registration start";
    }
  }

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


// ----------- TICKETS -----------
if (data.ticketDetails?.length > 0) {
  data.ticketDetails.forEach((ticket, index) => {
    const ticketErrors = {};

    // Title (only if filled)
    // if (ticket.title && !ticket.title.trim()) {
    //   ticketErrors.title = "Invalid title";
    // }

    // Price (only if filled)
    if (
      ticket.price !== "" &&
      ticket.price !== null &&
      ticket.price !== undefined &&
      isNaN(Number(ticket.price))
    ) {
      ticketErrors.price = "Price must be a number";
    }

    // Quantity (only if filled)
    if (
      ticket.quantity !== "" &&
      ticket.quantity !== null &&
      ticket.quantity !== undefined &&
      isNaN(Number(ticket.quantity))
    ) {
      ticketErrors.quantity = "Quantity must be a number";
    }

    // Date logic ONLY if all exist
    if (
      ticket.saleStartDate &&
      ticket.saleStartTime &&
      ticket.saleEndDate &&
      ticket.saleEndTime
    ) {
      const saleStart = combineDateTime(
        ticket.saleStartDate,
        ticket.saleStartTime
      );
      const saleEnd = combineDateTime(
        ticket.saleEndDate,
        ticket.saleEndTime
      );

      if (new Date(saleStart) > new Date(saleEnd)) {
        ticketErrors.saleEndDate = "End must be after start";
      }
    }

    // Event compare ONLY if exists
    if (
      eventDate &&
      eventTime &&
      ticket.saleEndDate &&
      ticket.saleEndTime
    ) {
      const saleEnd = combineDateTime(
        ticket.saleEndDate,
        ticket.saleEndTime
      );
      const eventStart = combineDateTime(eventDate, eventTime);

      if (new Date(saleEnd) >= new Date(eventStart)) {
        ticketErrors.saleEndDate =
          "Sale must end before event starts";
      }
    }

    if (Object.keys(ticketErrors).length > 0) {
      if (!errors.ticketDetails) errors.ticketDetails = [];
      errors.ticketDetails[index] = ticketErrors;
    }
  });
}


// ----------- SPONSORSHIP -----------
if (data.sponsorshipTiles?.length > 0) {
  data.sponsorshipTiles.forEach((sponsor, index) => {
    const sponsorErrors = {};

    // // Title
    // if (sponsor.title && !sponsor.title.trim()) {
    //   sponsorErrors.title = "Invalid title";
    // }

    // // Description
    // if (sponsor.description && !sponsor.description.trim()) {
    //   sponsorErrors.description = "Invalid description";
    // }

    // Amount (only if filled)
    if (
      sponsor.amount !== "" &&
      sponsor.amount !== null &&
      sponsor.amount !== undefined &&
      isNaN(Number(sponsor.amount))
    ) {
      sponsorErrors.amount = "Amount must be a number";
    }

    // CTA
    if (sponsor.ctaLabel && !sponsor.ctaLabel.trim()) {
      sponsorErrors.ctaLabel = "Invalid CTA label";
    }

    if (Object.keys(sponsorErrors).length > 0) {
      if (!errors.sponsorshipTiles) errors.sponsorshipTiles = [];
      errors.sponsorshipTiles[index] = sponsorErrors;
    }
  });
}


  return errors;
};