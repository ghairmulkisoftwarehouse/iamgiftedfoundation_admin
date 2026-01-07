class DateFormats {
    constructor(date) {
        this.date = date ? new Date(date) : new Date(); 
    }

    ISO8601 () {
        return this.date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
    }
}

export default DateFormats;