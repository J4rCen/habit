import { Dayjs } from "dayjs";

const dateConversion = (data: Dayjs) => {
    return data.format("DD MMM YYYY")
}

export default dateConversion