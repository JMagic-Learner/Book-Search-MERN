import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login( $username: String!, $email: String!, $passwordL String!) {
    login(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser( $username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password ) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook( $bookInput: String! ) {
    saveBook(bookInput: $bookInput) {
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook( $bookInput: String! ) {
    saveBook(bookInput: $bookInput) {
        user {
            _id
            username
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook( $bookInput: String! ) {
    removeBook(bookInput: $bookInput) {
        user {
            _id
            username
        }
    }
}
`;