import { gql } from '@apollo/client'

export const LOGIN_USERS = gql`
    query LoginUsers {
        users {
            username
            password
            firstName
            lastName
            id
            contactInfo {
                id
            }
            userRole {
                id
            }
        }
    }
`
