import React, { useContext, useEffect } from 'react';
import "./SearchBar.scss";
import { JobsContext } from './contexts/jobs.context';

function SearchBar() {

  const { fetchJobs, state : { jobs, page, description, location, searchedDescription, searchedLocation, fullTime, loading }, dispatch } = useContext(JobsContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    search();
  }
  
  useEffect(()=> {
    dispatch({type: "UPDATE", payload: {loading: true}});
      const fetchData = async () => {
        const jobs = await fetchJobs(searchedDescription, searchedLocation, page, fullTime);
        dispatch({type: "UPDATE", payload: {jobs: jobs}})
        dispatch({type: "UPDATE", payload: {loading: false}});
      }
      fetchData();
  }, [fullTime])

  const search = async () => {
    dispatch({type: "UPDATE", payload: {loading: true}});
    const jobs = await fetchJobs(description, location, 0, fullTime);
    dispatch({type: "UPDATE", payload: {jobs: jobs, page: 0, searchedDescription: description, searchedLocation: location}});
    dispatch({type: "UPDATE", payload: {loading: false}});
  }

  return (
      <form className="SearchBar" onSubmit={handleSubmit}>
        <input
          className="input-description heading-4"
          type="text"
          placeholder="Filter by description"
          id="description"
          name="description"
          value={description}
          onChange={e => dispatch({type: "HANDLE_INPUT", payload: {
            value: e.target.value,
            name: e.target.name
          }})}
        />
        <input
          className="input-location heading-4"
          type="text"
          placeholder="Filter by location"
          id="location"
          name="location"
          value={location}
          onChange={e => dispatch({type: "HANDLE_INPUT", payload: {
            value: e.target.value,
            name: e.target.name
          }})}
        />
        <div className="checkbox-search">
          <div className="checkbox-full-time">
            <input type="checkbox" name="fullTime" id="checkbox" checked={fullTime === "on"} onChange={() => dispatch({type: "SWITCH_FULL_TIME"})} disabled={loading || !jobs.length}/>
            <label htmlFor="checkbox"></label>
          </div>
          <span className="heading-4 bold">Full Time</span>
        <button 
          className="btn-search btn-violet btn"
          disabled={loading}
        >Search
        </button>
        </div>
      </form>
  )
}

export default SearchBar;