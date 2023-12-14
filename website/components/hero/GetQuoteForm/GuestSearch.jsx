import React, { useState } from "react";

import { useEffect } from "react";

const counters = [
  { name: "Adults", defaultValue: 0 },
  { name: "Children", defaultValue: 0 },
  { name: "Infant", defaultValue: 0 },
  { name: "Rooms", defaultValue: 0 },
];

const Counter = ({ name, defaultValue, onCounterChange }) => {
  const [count, setCount] = useState(defaultValue);
  const incrementCount = () => {
    setCount(count + 1);
    onCounterChange(name, count + 1);
  };
  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      onCounterChange(name, count - 1);
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name}</div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 2 - 11</div>
          )}
          {name === "Infant" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 2</div>
          )}
          {name === "Adults" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 11+</div>
          )}
        </div>
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={decrementCount}
            >
              <i className="icon-minus text-12" />
            </button>
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              onClick={incrementCount}
            >
              <i className="icon-plus text-12" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

const GuestSearch = ({ setGuests , guests}) => {
  const [guestCounts, setGuestCounts] = useState(guests);
  useEffect(() => {
    setGuests(guestCounts);
  },[guestCounts,setGuests])
  
  const handleCounterChange = (name, value) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="searchMenu-guests px-20 py-10 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
        aria-label="Guests"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Guests</h4>
        <div className="text-15 text-light-1 ls-2 lh-16 px-15 py-10 rounded-4" style={{border: "1px solid black"}}>
          Adults-&nbsp;<span className="js-count-adult">&nbsp;{guestCounts.Adults}&nbsp;</span> {" "}
          Children - <span className="js-count-child">{guestCounts.Children}</span>{" "}
          Infant - <span className="js-count-infant">{guestCounts.Infant}</span>{" "}
          Rooms-&nbsp;<span className="js-count-room">&nbsp;{guestCounts.Rooms}&nbsp;</span>{" "}
        </div>
      </div>

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              defaultValue={counter.defaultValue}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default GuestSearch;
