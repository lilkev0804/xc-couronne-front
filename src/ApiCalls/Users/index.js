import { gql } from "@apollo/client";
import xcApollo from "../../apollo/apollo-client";

export const createNewUser = async ({
  status,
  username,
  encadrant,
  firstConnexion,
  password,
  email,
}) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation CreateUser(
        $status: EMUN_MODEL_TYPE_USER_ENUM
        $username: String
        $password: String
        $firstConnexion: Boolean
        $encadrant: Boolean
        $email: String
      ) {
        createUser(
          status: $status
          username: $username
          password: $password
          first_connexion: $firstConnexion
          encadrant: $encadrant
          email: $email
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
      email: email,
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
          avatar
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
            discipline
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
          avatar
          participations {
            idEvent
            resultatScratch
            resultatCat
            frais
            nomEvent
            date
            discipline
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

export const getAllUser = async () => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query GetAllUsers {
        getAllUsers {
          admin
          encadrant
          id
          username
          nom
          prenom
          email
        }
      }
    `,
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
          avatar
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

export const updateUserToAdmin = async ({ id, admin }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateUserAdmin($updateUserAdminId: ID, $admin: Boolean) {
        updateUserAdmin(id: $updateUserAdminId, admin: $admin) {
          message
          successful
        }
      }
    `,
    variables: {
      admin: admin,
      updateUserAdminId: id,
    },
  });
  return { data, errors };
};
