import { gql } from "@apollo/client";

export const UserContactInfo = gql`
  query userContactInfo($id: Int!) {
    user(id: $id) {
      contactInfo {
        id
        email
        phone
        city
        website
        avatarUrl
        about
        country {
          name
          id
        }
      }
    }
  }
`;

export const Countries = gql`
  query countries {
    counties {
      id
      name
    }
  }
`;

export const Educations = gql`
  query userEducations($id: Int!) {
    user(id: $id) {
      id
      userEducations {
        description
        id
        institution
        startDate
        endDate
      }
    }
  }
`;

export const UserWorkExperiences = gql`
  query WorkExperience($id: Int!) {
    user(id: $id) {
      id
      userWorkExperiences {
        institution
        description
        startDate
        endDate
        id
      }
    }
  }
`;

export const UserSkills = gql`
  query userSkills($id: Int!) {
    user(id: $id) {
      id
      userSkills {
        id
        rating
        skill {
          name
          id
        }
      }
    }
  }
`;

export const Skills = gql`
  query skills {
    skills {
      name
      id
    }
  }
`;

export const Users = gql`
  query Users {
    users {
      firstName
      lastName
      username
      password
      id
      userRole {
        id
      }
    }
  }
`;

export const Jobs = gql`
  query jobs {
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
`;

export const Companies = gql`
  query companies {
    companies {
      name
      id
      user {
        id
        username
      }
    }
  }
`;

export const Job = gql`
  query job($id: Int!) {
    job(id: $id) {
      id
      name
      description
      company {
        id
        name
      }
      jobSkills {
        id
        rating
        skill {
          name
          id
        }
      }
      jobBenefits {
        id
        name
      }
      jobRequirements {
        id
        name
      }
    }
  }
`;

export const JobApplications = gql`
  query userJobApplications {
    userJobApplications {
      id
      isAccepted
      user {
        id
        firstName
        lastName
        userEducations {
          id
          institution
          description
        }
        userWorkExperiences {
          id
          institution
          description
        }
        userSkills {
          id
          rating
          skill {
            id
            name
          }
        }
        contactInfo {
          id
          email
          phone
          city
          website
          avatarUrl
          about
          country {
            name
            id
          }
        }
      }
      job {
        id
        name
        company {
          name
          id
        }
      }
    }
  }
`;

export const User = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      contactInfo {
        id
        email
        avatarUrl
      }
    }
  }
`;
