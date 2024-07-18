import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const dateUtils = {
  formatDate: (date: Date) => dayjs(date).format('YYYY-MM-DD'),
  formatTime: (date: Date) => dayjs(date).format('HH:mm'),
  datePassed: (date: string) => dayjs(date).isBefore(dayjs()),
  dateFromNow: (date: string) => dayjs().to(dayjs(date)),
}

export default dateUtils
