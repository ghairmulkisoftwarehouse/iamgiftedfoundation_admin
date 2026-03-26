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


    if (data.slug && data.slug.trim().length > 0 && data.slug.trim().length < 3) {
      errors.slug = "Slug must be at least 3 characters ";
    }

    // Short description validation (optional, min 3 characters if filled)
    if (data.shortDescription && data.shortDescription.trim().length > 0 && data.shortDescription.trim().length < 3) {
      errors.shortDescription = "Short description must be at least 3 characters ";
    }

  if (!data.eventType) {
    errors.eventType = "Event type is required";
  }

    // if (!data.category) {
    //   errors.category = "Category is required";
    // }

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

    // Event end date/time optional but must be paired
  if ((eventEndDate && !eventEndTime) || (!eventEndDate && eventEndTime)) {
    errors.eventEndDate = "Both event end date and time must be selected";
    errors.eventEndTime = "Both event end date and time must be selected";
  }


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



  const isEventProgram = data.eventType === "program";

if (isEventProgram) {
  const isProgramCategory = data.category?.title === "Program";

  if (isProgramCategory) {
    if (!data.piller) {
      errors.piller = "Piller is required for Program category";
    }

    if (!data.program) {
      errors.program = "Program is required";
    }
  }
}


if (data.ticketDetails && data.ticketDetails.length > 0) {
  data.ticketDetails.forEach((ticket, index) => {
    const ticketErrors = {};

    // Only validate if any field is filled
    const anyFieldFilled = Object.values(ticket).some(
      val => val !== "" && val !== null && val !== undefined
    );

    if (anyFieldFilled) {
      if (!ticket.title?.trim()) ticketErrors.title = "Ticket title is required";
      // if (!ticket.description?.trim()) ticketErrors.description = "Ticket description is required";
      if (ticket.price === "" || ticket.price === null || isNaN(Number(ticket.price))) {
        ticketErrors.price = "Ticket price is required and must be a number";
      }
      if (ticket.quantity === "" || ticket.quantity === null || isNaN(Number(ticket.quantity))) {
        ticketErrors.quantity = "Ticket quantity is required and must be a number";
      }
      if (!ticket.saleStartDate) ticketErrors.saleStartDate = "Ticket sale start date is required";
      if (!ticket.saleStartTime) ticketErrors.saleStartTime = "Ticket sale start time is required";
      if (!ticket.saleEndDate) ticketErrors.saleEndDate = "Ticket sale end date is required";
      if (!ticket.saleEndTime) ticketErrors.saleEndTime = "Ticket sale end time is required";

      // Check sale start/end order
      if (ticket.saleStartDate && ticket.saleStartTime && ticket.saleEndDate && ticket.saleEndTime) {
        const saleStart = combineDateTime(ticket.saleStartDate, ticket.saleStartTime);
        const saleEnd = combineDateTime(ticket.saleEndDate, ticket.saleEndTime);
        if (new Date(saleStart) > new Date(saleEnd)) {
          ticketErrors.saleEndDate = "Sale end must be after sale start";
          ticketErrors.saleEndTime = "Sale end time cannot be earlier than start time";
        }
      }

      // Sale must end before event starts
      if (eventDate && eventTime && ticket.saleEndDate && ticket.saleEndTime) {
        const saleEnd = combineDateTime(ticket.saleEndDate, ticket.saleEndTime);
        const eventStart = combineDateTime(eventDate, eventTime);
        if (new Date(saleEnd) >= new Date(eventStart)) {
          ticketErrors.saleEndDate = "Ticket sale must end before event starts";
        }
      }

      if (Object.keys(ticketErrors).length > 0) {
        if (!errors.ticketDetails) errors.ticketDetails = [];
        errors.ticketDetails[index] = ticketErrors;
      }
    }
  });
}


if (data.sponsorshipTiles && data.sponsorshipTiles.length > 0) {
  data.sponsorshipTiles.forEach((sponsor, index) => {
    const sponsorErrors = {};

    // Only validate if any field is filled
    const anyFieldFilled = Object.values(sponsor).some(
      val => val !== "" && val !== null && val !== undefined
    );

    if (anyFieldFilled) {
      if (!sponsor.title?.trim()) sponsorErrors.title = "Sponsor title is required";
      if (!sponsor.description?.trim()) sponsorErrors.description = "Sponsor description is required";
      if (sponsor.amount === "" || sponsor.amount === null || isNaN(Number(sponsor.amount))) {
        sponsorErrors.amount = "Sponsor amount is required and must be a number";
      }
      if (!sponsor.ctaLabel?.trim()) sponsorErrors.ctaLabel = "Sponsor CTA label is required";
      // if (sponsor.sortOrder === "" || sponsor.sortOrder === null || isNaN(Number(sponsor.sortOrder))) {
      //   sponsorErrors.sortOrder = "Sponsor sort order is required and must be a number";
      // }

      if (Object.keys(sponsorErrors).length > 0) {
        if (!errors.sponsorshipTiles) errors.sponsorshipTiles = [];
        errors.sponsorshipTiles[index] = sponsorErrors;
      }
    }
  });
}
    return errors;
  };