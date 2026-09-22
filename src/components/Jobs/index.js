import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard'

import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    jobsList: [],
    activeSalaryRangeId: '',
    activeEmploymentTypeId: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeSalaryRangeId, activeEmploymentTypeId} =
      this.state
    const joinedEmployment = activeEmploymentTypeId.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedEmployment}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobsData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      const updatedJobDetails = {
        jobs: updatedJobsData,
        total: fetchedData.total,
      }
      this.setState({
        jobsList: updatedJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickSearch = () => {
    this.getJobs()
  }

  renderSuccessView = () => {
    const {searchInput, jobsList} = this.state
    const showJobs = jobsList.total > 0

    return (
      <div className="jobs-search-container">
        <div className="filter-laptop-input-container">
          <input
            className="search-input"
            type="search"
            value={searchInput}
            placeholder="Search"
            onChange={this.changeSearchInput}
          />
          <button
            className="search-button"
            type="button"
            data-testid="searchButton"
            onClick={this.clickSearch}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {showJobs ? (
          <ul className="jobs-list-container">
            {jobsList.jobs.map(each => (
              <JobCard jobDetails={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              className="no-jobs-image"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </div>
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
      <button className="retry-button" type="button" onClick={this.getJobs}>
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

  changeEmploymentType = types => {
    this.setState({activeEmploymentTypeId: types}, this.getJobs)
  }

  changeSalaryRange = range => {
    this.setState({activeSalaryRangeId: range}, this.getJobs)
  }

  render() {
    const {searchInput, activeSalaryRangeId, activeEmploymentTypeId} =
      this.state

    return (
      <div className="jobs-container">
        <Header />
        <div className="filter-jobs-container">
          <FilterGroup
            searchInput={searchInput}
            activeEmploymentTypeId={activeEmploymentTypeId}
            activeSalaryRangeId={activeSalaryRangeId}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            changeSearchInput={this.changeSearchInput}
            clickSearch={this.clickSearch}
          />
          {this.renderViews()}
        </div>
      </div>
    )
  }
}

export default Jobs
