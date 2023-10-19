import DatePicker from "react-multi-date-picker";
import React, { useState } from "react";

import { useEffect } from "react";

const DateSearch = ({ setDates , dates}) => {

  const [date, setDate] = useState(dates);

  useEffect(() => {
    const formattedDates = date.map((d) => d.format("YYYY-MM-DD"));
    setDates(formattedDates);
  }, [date, setDates]);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
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
      />
    </div>
  );
};

export default DateSearch;
