import React, { createContext, useState, useReducer } from "react";
import JobsReducer from '../reducers/jobs.reducer';
import axios from 'axios';

export const JobsContext = createContext();

export function JobsProvider(props) {

  const initialState = {
    jobs: [],
    description: "",
    location: "",
    searchedDescription: "",
    searchedLocation: "",
    page: 0,
    fullTime: "off",
    loading: true
  }

  const fetchJobs = async (description, location, page, fullTime) => {
    try {
      let res = await axios.get("https://secret-ocean-49799.herokuapp.com/https://jobs.github.com/positions.json", {
        params: {
          description: description,
          location: location,
          page: page,
          full_time: fullTime
        }
      });
      return res.data;   
    } catch(e) {
      alert(e)
    }
  }

  const [state, dispatch] = useReducer(JobsReducer, initialState);

  return (
    <JobsContext.Provider value={{fetchJobs, state, dispatch }}>
      {props.children}
    </JobsContext.Provider>
  )
};
