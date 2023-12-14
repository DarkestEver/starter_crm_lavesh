import React, { useState } from "react";

import DatePicker from "react-multi-date-picker";
import { useEffect } from "react";

const DateSearch = ({ setDates , dates}) => {

  const [date, setDate] = useState(dates);

  useEffect(() => {
    const formattedDates = date.map((d) => d.format("YYYY-MM-DD"));
    setDates(formattedDates);
  }, [date, setDates]);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker"> 
      <div className="js-search js-dd-focus px-15 py-10 rounded-4" style={{border: "1px solid black"}}>
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={date}
        onChange={setDate}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        format="MMMM DD"
        aria-label="Date"
        id="date"
      />
      </div>
    </div>
  );
};

export default DateSearch;
