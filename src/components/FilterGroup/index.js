import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {
    searchInput,
    activeEmploymentTypeId,
    changeEmploymentType,
    activeSalaryRangeId,
    changeSalaryRange,
    changeSearchInput,
    clickSearch,
  } = props

  const changeSearch = event => {
    changeSearchInput(event)
  }

  const onSearch = () => {
    clickSearch()
  }

  const onChangeEmploymentType = event => {
    const {value, checked} = event.target
    if (checked) {
      changeEmploymentType([...activeEmploymentTypeId, value])
    } else {
      changeEmploymentType(
        activeEmploymentTypeId.filter(type => type !== value),
      )
    }
  }

  const onChangeSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }

  return (
    <>
      <div className="filter-group-container">
        <div className="filter-mobile-input-container">
          <input
            className="search-input"
            type="search"
            value={searchInput}
            placeholder="Search"
            onChange={changeSearch}
          />
          <button
            className="search-button"
            type="button"
            data-testid="searchButton"
            onClick={onSearch}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <Profile />
        <hr className="filter-seperator" />
        <div className="filter-employment-container">
          <h1 className="filter-employment-heading">Type of Employment</h1>
          <ul className="filter-employment-types-list">
            {employmentTypesList.map(each => (
              <li className="filter-employment-type-container" key={each.label}>
                <label
                  className="employment-label"
                  htmlFor={each.employmentTypeId}
                >
                  <input
                    className="filter-input-checkbox"
                    type="checkbox"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    checked={activeEmploymentTypeId.includes(
                      each.employmentTypeId,
                    )}
                    onChange={onChangeEmploymentType}
                  />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="filter-seperator" />
        <div className="filter-salary-container">
          <h1 className="filter-salary-heading">Salary Range</h1>
          <ul className="filter-salary-range-container">
            {salaryRangesList.map(each => (
              <li className="filter-salary-range" key={each.label}>
                <label className="salary-label" htmlFor={each.salaryRangeId}>
                  <input
                    className="filter-radio-input"
                    id={each.salaryRangeId}
                    type="radio"
                    value={each.salaryRangeId}
                    checked={activeSalaryRangeId === each.salaryRangeId}
                    onChange={onChangeSalaryRange}
                  />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default FilterGroup
