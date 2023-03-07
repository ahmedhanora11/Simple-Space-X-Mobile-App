import { gql } from '@apollo/client'

const RocketQuery = gql`
query Rockets($rocketName: String){
  rockets(byName:$rocketName){
    boosters
    company
    country
    description
    name
    type
    id
  }
}
`;

export default RocketQuery;