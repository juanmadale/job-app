import React, { useState, useEffect, useContext} from 'react';
import { JobsContext } from './contexts/jobs.context';
import axios from 'axios';
import './JobDetails.scss';
import TimeAgo from 'timeago-react';
import NotFound from './NotFound';
import { Link } from 'react-scroll';
import bigHeader from './assets/desktop/bg-pattern-header.svg';

function JobDetails( routerProps ) { 
  const jobId = routerProps.match.params.jobId;
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(JobsContext);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`https://secret-ocean-49799.herokuapp.com/https://jobs.github.com/positions/${jobId}.json`);
        setDetails(res.data);
        dispatch({type: "UPDATE", payload: {loading: false}});
        console.log(res.data);    
      } catch(e) {
        setError(true);
        dispatch({type: "UPDATE", payload: {loading: false}});
        console.log(e)
      }     
    }
    fetchData();  
  }, [state.loading])

  if (state.loading) {
    return ( 
    <div className="spinner-wrapper">
    <div className="spinner"/>
  </div>    
  )} else if (error === true) {
    return <NotFound />
  } else {
    let company = details.company;
    let companyLogo = details.company_logo;
    let companyUrl = details.company_url;
    let description = details.description;
    let howToApply = details.how_to_apply;
    let title = details.title;
    let type = details.type;
    let location = details.location;
    const timeAgo = details.created_at;
    //Extracts the HTML
    function createMarkup(input) {
      return {__html: input}
    }
    return (
      <div className="JobDetails">
        <span className= "header-title bold">devjobs</span>
        <img className="big-header-img" src={bigHeader} alt="Header" />
        <div className="container">
          <div className="company-section">
            <div className="logo">
              <img src={companyLogo} alt="Company Logo" ></img>
            </div>
            <div className="info">
                <div className="name-website">
                  <h2 className="bold">{company}</h2>
                  <h4>{companyUrl}</h4>
                </div>
                <a href={companyUrl} target="_blank" rel="noreferrer" className="btn-company-site btn-light-violet btn">Company Site</a>
            </div>
          </div>
          <div className="job-section">
            <div className="description-header">
              <div className="details">
                <h4 className="job-time-type"><TimeAgo datetime={timeAgo}/><span> - </span> Part time</h4>
                <h1 className="job-title bold">{title}</h1>
                <h4 className="job-location bold">{type}, {location}</h4>
              </div>
              <Link to="how-to-apply" spy={true} smooth={true}><button className="btn-apply btn-violet btn">Apply Now</button></Link>
            </div>
            <div className="description-body" dangerouslySetInnerHTML={createMarkup(description)}>
            </div>     
          </div>
          <div id="how-to-apply" className="how-to-apply-section">
            <h2 className="title bold">How to Apply</h2>
            <div className="instructions" dangerouslySetInnerHTML={createMarkup(howToApply)}></div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobDetails;