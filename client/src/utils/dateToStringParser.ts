import { format } from "date-fns"

const dateToStringParser = (date: Date) => {
    return format(date, "dd.MM.yyyy")
}

export default dateToStringParser
