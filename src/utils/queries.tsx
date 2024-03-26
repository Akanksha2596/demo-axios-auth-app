const LOGIN_MUTATION = `
  mutation UserSignIn($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        email
        id
      }
    }
  }
`;

const SIGNUP_MUTATION = `
mutation registerUser($username: String!, $email: String!, $password: String!) {
    register(input: {
      username: $username
      email: $email
      password: $password
    }) {
      jwt
    }
  }
`;

export default {LOGIN_MUTATION, SIGNUP_MUTATION};