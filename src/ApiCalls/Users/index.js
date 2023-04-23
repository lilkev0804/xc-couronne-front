import { gql } from "@apollo/client";
import xcApollo from "../../apollo/apollo-client";

export const createNewUser = async ({
  status,
  username,
  encadrant,
  admin,
  firstConnexion,
  password,
}) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation CreateUser(
        $status: EMUN_MODEL_TYPE_USER_ENUM
        $username: String
        $password: String
        $firstConnexion: Boolean
        $encadrant: Boolean
        $admin: Boolean
      ) {
        createUser(
          status: $status
          username: $username
          password: $password
          first_connexion: $firstConnexion
          encadrant: $encadrant
          admin: $admin
        ) {
          admin
          encadrant
          first_connexion
        }
      }
    `,
    variables: {
      status: status,
      username: username,
      password: password,
      firstConnexion: firstConnexion,
      encadrant: encadrant,
      admin: admin,
    },
  });
  return { data, errors };
};

export const loginUser = async ({ username, password }) => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query LoginUser($username: String, $password: String) {
        loginUser(username: $username, password: $password) {
          username
          encadrant
          admin
          first_connexion
          id
          information {
            bikes
            licenceType
            stravaAccount
          }
          participations {
            idEvent
            resultatScratch
            resultatCat
            frais
          }
          status
        }
      }
    `,
    variables: {
      username: username,
      password: password,
    },
  });
  return { data, errors };
};

export const getUserId = async ({ id }) => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query GetUserById($getUserByIdId: ID) {
        getUserById(id: $getUserByIdId) {
          id
          status
          username
          password
          admin
          first_connexion
          encadrant
          participations {
            idEvent
            resultatScratch
            resultatCat
            frais
          }
          information {
            bikes
            licenceType
            stravaAccount
          }
        }
      }
    `,
    variables: {
      getUserByIdId: id,
    },
  });
  return { data, errors };
};
