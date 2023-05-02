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
            pratiques
          }
          participations {
            idEvent
            resultatScratch
            resultatCat
            frais
            nomEvent
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
          admin
          first_connexion
          encadrant
          participations {
            idEvent
            resultatScratch
            resultatCat
            frais
            nomEvent
          }
          information {
            bikes
            licenceType
            stravaAccount
            pratiques
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

export const addParticipationUser = async ({ id, participations }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation AddUserParticipation(
        $addUserParticipationId: ID
        $participations: [ParticipationUserTypeInputSchema]
      ) {
        addUserParticipation(
          id: $addUserParticipationId
          participations: $participations
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      addUserParticipationId: id,
      participations: participations,
    },
  });
  return { data, errors };
};

export const getAllCoureur = async () => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query GetAllCoureur {
        getAllCoureur {
          id
          username
          participations {
            idEvent
          }
          information {
            licenceType
            stravaAccount
            bikes
            pratiques
          }
          encadrant
        }
      }
    `,
  });
  return { data, errors };
};

export const updateUserInformation = async ({ id, information }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateUserInformation(
        $information: InformationUserTypeInputSchema
        $updateUserInformationId: ID
      ) {
        updateUserInformation(
          information: $information
          id: $updateUserInformationId
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      information: information,
      updateUserInformationId: id,
    },
  });
  return { data, errors };
};

export const updateUserToEncadrant = async ({ id, encadrant }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateUserToEncadrant(
        $updateUserToEncadrantId: ID
        $encadrant: Boolean
      ) {
        updateUserToEncadrant(
          id: $updateUserToEncadrantId
          encadrant: $encadrant
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      encadrant: encadrant,
      updateUserToEncadrantId: id,
    },
  });
  return { data, errors };
};

export const updateUserParticipation = async ({ id, participations }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateUserParticipation(
        $updateUserParticipationId: ID
        $participations: [ParticipationUserTypeInputSchema]
      ) {
        updateUserParticipation(
          id: $updateUserParticipationId
          participations: $participations
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      participations: participations,
      updateUserParticipationId: id,
    },
  });
  return { data, errors };
};
