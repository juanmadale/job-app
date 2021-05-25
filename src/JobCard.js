import React from 'react';
import './JobCard.scss';
import TimeAgo from 'timeago-react';

function JobCard({ date, type, title, company, location }) {
  return(
    <div className="JobCard">
      <div className="JobCard-body">
        <h4 className="job-time-type"><TimeAgo datetime={date}/><span> - </span> {type}</h4>
        <h3 className="job-title bold">{title}</h3>
        <h4 className="company-name">{company}</h4>
        <div className="job-location bold">{location}</div>
      </div>
    </div>
  )
}

export default JobCard;