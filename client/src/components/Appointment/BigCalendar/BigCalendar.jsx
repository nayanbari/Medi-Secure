import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function BigCalendar({eventDataHandler, prevEventsData}) {
  const [eventsData, setEventsData] = useState(prevEventsData);
  // setEventsData([...eventsData, prevEventsData])
  // console.log(eventsData)

  useEffect(() => {
    setEventsData(prevEventsData)
  }, []);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title){
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
      console.log([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ])
      eventDataHandler([...eventsData, {start, end, title}])
    }
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
