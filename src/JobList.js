import React, { useContext, useEffect } from 'react';
import { JobsContext } from './contexts/jobs.context';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import bigHeader from './assets/desktop/bg-pattern-header.svg';
import './JobList.scss';

function JobList() {
  const { fetchJobs, state : { searchedDescription, searchedLocation, page, fullTime, loading, jobs}, dispatch } = useContext(JobsContext);

  useEffect(() => {
    async function fetchData() {
      let jobs = await fetchJobs();
      dispatch({type: "UPDATE", payload: {jobs: jobs}});
      dispatch({type: "UPDATE", payload: {loading: false}});
    }
    fetchData();
  }, [])

  //Switches pages
  const switchPage = async (delta) => {
    dispatch({type: "UPDATE", payload: {loading: true}});
    const jobs = await fetchJobs(searchedDescription, searchedLocation, page + delta, fullTime);
    dispatch({type: "UPDATE", payload: {jobs: jobs, page: page + delta}});
    dispatch({type: "UPDATE", payload: {loading: false}});
  }

  //Renders spinner, jobs, or not found message
  const renderJobs = () => {
    let display;
    if (loading) {
      display = 
      <div className="spinner-wrapper">
      <div className="spinner"/>
    </div>    
    } else if (!jobs.length) {
      display = 
      <div className="no-jobs-wrapper">
        <h1>No jobs to display</h1>
      </div>
    } else {
      display =  
      <div className="card-display">
      {jobs.map(j =>(
        <Link onClick={() => dispatch({type: "UPDATE", payload: {loading: true}})} key={j.id} to={`/${j.id}` }>
          <JobCard
            company={j.company}
            location={j.location}
            title={j.title}
            type={j.type}
            date={j.created_at}
          />
        </Link>
      ))}
    </div>   
    }
    return display;      
  }
 
  return (
    <div className="JobList">
      <span className= "header-title bold">devjobs</span>
      <img className="big-header-img" src={bigHeader} alt="Header" />
      <div className="container">  
        <SearchBar/>    
        {renderJobs()}
        <div className="page-buttons">
          <button 
            className="previous-page btn-violet btn" 
            onClick={() => switchPage(-1)}
            disabled={
              loading || 
              (!jobs.length && page === 0) ||
              page === 0
            }
            >Previous
            </button>
          <h4 className="page-counter">{!jobs.length ? "" : !loading ? `Page ${page + 1}` : ""}</h4>
          <button 
            className="next-page btn-violet btn" 
            onClick={() => switchPage(+1)}
            disabled={loading || !jobs.length}
            >Next
            </button> 
        </div>  
      </div>
    </div>
  )
}

export default JobList;