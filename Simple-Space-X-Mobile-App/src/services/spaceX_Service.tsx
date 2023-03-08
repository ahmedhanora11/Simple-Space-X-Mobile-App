import { gql } from '@apollo/client'

const RocketQuery = gql`
query GetRockets {
    rockets {
        active
        boosters
        country
        description
        name
        type
        height {
            meters
        }
        mass {
            kg
        }
        diameter {
            meters
        }
    }
  }
`;

export default RocketQuery;