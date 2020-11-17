import React from 'react'
import { useQuery } from '@apollo/client'
import JobCard from './JobCard'
import { JOBS_LANDING } from './fetch/queries'
import ErrorBanner from '../../images/error.svg'
import './style/style.css'

export default function JobsContainer() {
    const { data: jobs } = useQuery(JOBS_LANDING)

    return (
        <div className="jobsContainer">
            {jobs !== undefined ? (
                jobs.jobs
                    .filter((job) => job.isAvailable === true)
                    .slice(0, 9)
                    .map((availableJob) => (
                        <JobCard key={availableJob.id} {...availableJob} />
                    ))
            ) : (
                <div className="error">
                    <img src={ErrorBanner} alt="No jobs found" />
                    <h1 className="error__message">
                        No <span className="orange">jobs</span> found.
                    </h1>
                </div>
            )}
        </div>
    )
}
