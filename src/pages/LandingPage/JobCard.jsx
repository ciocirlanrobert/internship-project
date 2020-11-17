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
            {/* Temporarily inline styling */}
            <Button
                size="large"
                variant="contained"
                color="primary"
                className="jobCardButton"
                style={{
                    backgroundColor: '#FFF3EC',
                    color: ' #ef6c35',
                    padding: '15px 30px',
                    borderRadius: '30px',
                    boxShadow: 'none',
                    textTransform: 'capitalize',
                }}
            >
                Apply now
            </Button>
        </div>
    )
}
