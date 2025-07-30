import { Dayjs } from "dayjs";

const dateConversion = (data: Dayjs) => {
    return data.format("DD-MM-YYYY")
}

export default dateConversion