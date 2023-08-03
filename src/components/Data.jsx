import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useGetEventsQuery } from "../services/eventsApi";
import HTMLReactParser from "html-react-parser";
import Loader from "./Loader";
import moment from "moment";
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Data = () => {
  const history = useHistory();
  const [orderBy, setOrderBy] = useState("name");
  const [label, setLabel] = useState("Ascending Order (A-Z)");
  const limit = "100";
  const { data: eventsList, isFetching } = useGetEventsQuery({
    orderBy,
    limit,
  });
  const [events, setEvents] = useState([]);

  const handleChange = (event, newValue) => {
    // setOrderBy(newValue);

    setOrderBy(newValue?.value);
    setLabel(newValue?.label);
    history.push(`/events?order=${newValue?.value}`);
  };

  const options = [
    { label: "Newest", value: "-startDate" },
    { label: "Oldest", value: "startDate" },
    { label: "Ascending Order (A-Z)", value: "name" },
    { label: "Descending Order (Z-A)", value: "-name" },
    { label: "Last Modified", value: "modified" },
  ];

  useEffect(() => {
    const fetchResults = eventsList?.data?.results;
    setEvents(fetchResults || []);
    console.log(fetchResults);
  }, [eventsList, orderBy]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <div className="bg-gray-950 text-white py-10 px-4 md:px-8 lg:px-20">
        <h4 className="text-center">Marvel Events</h4>

        <div className="flex items-end justify-end text-black mb-7">
          <fieldset className="fieldset flex items-center justify-center gap-2">
            <label
              htmlFor="loe"
              className="text-white uppercase font-semibold font-mono"
            >
              Order By
            </label>
            <div className=" w-[225px] h-auto mt-1 rounded-lg">
              <Autocomplete
                disablePortal
                id="grading-system"
                options={options}
                // getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                className="uppercase rounded-lg focus:outline-none bg-slate-400"
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Order By"
                    placeholder={label}
                    required
                    className="flex items-center justify-center placeholder:text-slate-950"
                  />
                )}
              />
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-14 gap-x-8 ">
          {events?.map((c) => (
            <div key={c.id}>
              <Link key={c.id} to={`/events/${c.id}`} className="py-4">
                <div className="py-2">
                  <img
                    src={c.thumbnail.path + ".jpg"}
                    className="rounded-xl"
                    alt={"img of " + c.title}
                    // title={
                    //   c.description
                    //     ? HTMLReactParser(c.description)
                    //     : "Sorry 😢, No description provided."
                    // }
                  />
                  {c.description ? (
                    <div className="tooltip bg-black text-white px-2 py-1 text-md rounded opacity-0 group-hover:opacity-100 absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-300 w-full">
                      {HTMLReactParser(c.description)}
                    </div>
                  ) : (
                    <div className="tooltip bg-black text-white px-2 py-1 text-md rounded opacity-0 group-hover:opacity-100 absolute bottom-0 left-1/2 transform -translate-x-1/2 pointer-events-none transition-opacity duration-300 w-full text-center">
                      "Sorry 😢, No description provided."
                    </div>
                  )}
                </div>
                <div className="uppercase font-bold h-[48px]">{c.title}</div>
                <div className="font-mono font-bold text-[#a7a4a4]">
                  {c.start ? moment(c.start).format("YYYY") : "Nill"}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;
