import React from 'react'
import { Button } from '@material-ui/core'
import './style/style.css'

export default function JobCard(props) {
    return (
        <div className="jobCardContainer">
            <div className="jobTitle">{props.name}</div>
            <p className="jobAbout">
                <span className="jobCompany">{props.company.name}</span> |
                Full-time or Contract
            </p>
            <Button
                variant="contained"
                color="primary"
                className="jobCardButton"
            >
                Apply now
            </Button>
        </div>
    )
}
