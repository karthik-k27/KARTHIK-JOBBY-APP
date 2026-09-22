import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="nav-link">
        <div className="job-card-title-container">
          <div className="job-card-title-rating-container">
            <img
              className="job-card-company-logo"
              src={companyLogoUrl}
              alt="company logo"
            />
            <div className="job-card-title-rating">
              <h1 className="job-card-title">{title}</h1>
              <div className="job-card-rating-container">
                <FaStar className="job-card-rating-star" />
                <p className="job-card-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-card-details-salary">
            <div className="job-card-location-employment">
              <div className="job-card-location-container">
                <MdLocationOn className="job-card-location-icon" />
                <p className="job-card-location">{location}</p>
              </div>
              <div className="job-card-employment-container">
                <BsBriefcaseFill className="job-card-location-icon" />
                <p className="job-card-location">{employmentType}</p>
              </div>
            </div>
            <p className="job-card-salary">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="job-card-seperator" />
        <div className="job-card-description-container">
          <h1 className="job-card-description-heading">Description</h1>
          <p className="job-card-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
