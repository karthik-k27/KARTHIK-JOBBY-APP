import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: [],
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const skillsData = fetchedData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const lifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }
      const jobDetails = {
        ...updatedData,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        skills: skillsData,
        lifeAtCompany,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
      }
      const similarJobData = fetchedData.similar_jobs.map(eachSimilarJob =>
        this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobData: jobDetails,
        similarJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  titleSection = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobData

    return (
      <div className="job-item-title-section-container">
        <div className="job-item-company-container">
          <img
            className="job-item-company-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="job-item-title-rating">
            <h1 className="job-item-title">{title}</h1>
            <div className="job-item-rating-container">
              <FaStar className="job-item-rating-star-logo" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-location-employment-package">
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
          <p className="job-item-package">{packagePerAnnum}</p>
        </div>
      </div>
    )
  }

  descriptionSection = () => {
    const {jobData} = this.state
    const {jobDescription, companyWebsiteUrl} = jobData

    return (
      <div className="job-item-description-section">
        <div className="job-item-description-container">
          <h1 className="job-item-description-heading">Description</h1>
          <a
            className="job-item-visit-link"
            target="_blank"
            rel="noopener noreferrer"
            href={companyWebsiteUrl}
          >
            Visit <FiExternalLink className="job-item-visit-logo" />
          </a>
        </div>
        <p className="job-item-job-description">{jobDescription}</p>
      </div>
    )
  }

  skillsSection = () => {
    const {jobData} = this.state
    const {skills} = jobData

    return (
      <div className="job-item-skills-section">
        <h1 className="job-item-skills-heading">Skills</h1>
        <ul className="job-item-skills-container">
          {skills.map(each => (
            <li className="job-item-skill-item" key={each.name}>
              <img
                className="job-item-skill-logo"
                src={each.imageUrl}
                alt={each.name}
              />
              <p className="job-item-skill-name">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  lifeAtCompanySection = () => {
    const {jobData} = this.state
    const {lifeAtCompany} = jobData

    return (
      <div className="job-item-lifeatcompany-section">
        <h1 className="job-item-lifeatcompany-heading">Life at Company</h1>
        <div className="job-item-lifeatcompany-container">
          <p className="job-item-lifeatcompany-description">
            {lifeAtCompany.description}
          </p>
          <img
            className="job-item-lifeatcompany-image"
            src={lifeAtCompany.imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  bodySection = () => (
    <div className="job-item-body-section">
      {this.descriptionSection()}
      {this.skillsSection()}
      {this.lifeAtCompanySection()}
    </div>
  )

  renderSuccessView = () => {
    const {similarJobData} = this.state

    return (
      <>
        <div className="job-item-title-body-container">
          {this.titleSection()}
          <hr className="job-item-seperator" />
          {this.bodySection()}
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobData.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-button" type="button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}

export default JobItemDetails
