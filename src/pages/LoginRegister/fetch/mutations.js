import { gql } from '@apollo/client'

export const NEW_REGISTERED_USER = gql`
    mutation createNewRegisteredUser(
        $username: String!
        $firstName: String!
        $lastName: String!
        $password: String!
        $userRoleId: Int!
    ) {
        createUser(
            username: $username
            firstName: $firstName
            lastName: $lastName
            password: $password
            userRoleId: $userRoleId
        ) {
            id
            username
            firstName
            lastName
            password
            userRole {
                id
            }
        }
    }
`

export const NEW_REGISTERED_CONTACTINFO = gql`
    mutation createNewRegisteredContactInfo(
        $email: String!
        $phone: String!
        $city: String!
        $website: String!
        $avatarUrl: String!
        $about: String!
        $countryId: Int!
    ) {
        createContactInfo(
            email: $email
            phone: $phone
            city: $city
            website: $website
            avatarUrl: $avatarUrl
            about: $about
            countryId: $countryId
        ) {
            id
        }
    }
`

export const UPDATE_NEW_CONTACTINFO = gql`
    mutation updateNewRegisteredContactInfo($contactInfoId: Int!, $id: Int!) {
        updateUser(id: $id, contactInfoId: $contactInfoId) {
            id
        }
    }
`
