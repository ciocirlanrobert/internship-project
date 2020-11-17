import { gql } from '@apollo/client'

export const JOBS_LANDING = gql`
    query jobsLanding {
        jobs {
            id
            isAvailable
            name
            description
            company {
                id
                name
                user {
                    id
                }
            }
            jobRequirements {
                id
                name
            }
            jobBenefits {
                id
                name
            }
            jobSkills {
                id
                rating
                skill {
                    id
                    name
                }
            }
        }
    }
`
