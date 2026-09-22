import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    location,
    employmentType,
  } = similarJobDetails

  return (
    <li className="similar-job-item-container">
      <div className="similar-job-company-container">
        <img
          className="similar-job-company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-role-rating">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <FaStar className="similar-job-star" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="job-item-location-employment">
        <div className="job-item-location-container">
          <MdLocationOn className="job-item-location-logo" />
          <p className="job-item-location">{location}</p>
        </div>
        <div className="job-item-location-container">
          <BsBriefcaseFill className="job-item-location-logo" />
          <p className="job-item-location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
