export const createScheduleAdapter = (data) => ({
    day: data.day,
    open: data.open,
    close: data.close,
})
export const parseScheduleAdapter = (data) => ({
    day: data.day,
    open: data.open,
    close: data.close,
    selected: false
})
