import { parse } from "date-fns"

const dateToISOParser = (stringDate: string) => {
    return parse(stringDate, "dd.MM.yyyy", new Date())
}

export default dateToISOParser
