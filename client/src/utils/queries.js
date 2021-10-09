import { gql, useQuery } from '@apollo/client';

export const GET_ME = gql`
query me($username: String!) {
    user(username: $username) { 
      username
    }
}
`;

