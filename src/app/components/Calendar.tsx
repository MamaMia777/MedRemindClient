// const localizer = dayjsLocalizer(dayjs);
import moment from "moment";
import { Calendar as ReactCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
const events = [
  {
    title: "Event 1",
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
  {
    title: "Event 2",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];

const localizer = momentLocalizer(moment);
export default function Calendar() {
  return (
    <div className="w-full h-[100%] ">
      <p>Calendar to be continued...</p>
      <ReactCalendar events={events} localizer={localizer} />
    </div>
  );
}
