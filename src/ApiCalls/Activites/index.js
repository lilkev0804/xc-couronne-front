import { gql } from "@apollo/client";
import xcApollo from "../../apollo/apollo-client";

export const createNewActivities = async ({
  name,
  discipline,
  date,
  creator,
  hour,
  zipcode,
  ville,
  denivele,
  distance,
  coureur,
}) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation CreateActivities(
        $name: String
        $date: String
        $ville: String
        $zipcode: String
        $hour: String
        $creator: String
        $denivele: Int
        $distance: Int
        $coureur: [UserTypeInputSchema]
        $discipline: EMUN_MODEL_TYPE_RACE_FORMAT
      ) {
        createActivities(
          name: $name
          date: $date
          ville: $ville
          zipcode: $zipcode
          hour: $hour
          creator: $creator
          denivele: $denivele
          distance: $distance
          coureur: $coureur
          discipline: $discipline
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      name: name,
      discipline: discipline,
      date: date,
      creator: creator,
      hour: hour,
      zipcode: zipcode,
      ville: ville,
      denivele: denivele,
      distance: distance,
      coureur: coureur,
    },
  });
  return { data, errors };
};

export const getAllActivities = async () => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query GetAllActivities {
        getAllActivities {
          coureur {
            id
            username
          }
          zipcode
          ville
          podium {
            id
            username
          }
          creator
          date
          denivele
          distance

          hour
          id
          name
          discipline
          encadrant {
            id
            username
            avatar
          }
        }
      }
    `,
  });
  return { data, errors };
};

export const getActivitiesById = async ({ id }) => {
  const { data, errors } = await xcApollo.query({
    query: gql`
      query GetActivitiesById($getActivitiesByIdId: ID) {
        getActivitiesById(id: $getActivitiesByIdId) {
          id
          name
          date
          hour
          creator
          ville
          zipcode
          distance
          denivele
          discipline
          coureur {
            id
            username
            avatar
            information {
              pratiques
            }
          }
          encadrant {
            id
            username
            avatar
          }
          podium {
            id
            username
            avatar
          }
        }
      }
    `,
    variables: {
      getActivitiesByIdId: id,
    },
  });
  return { data, errors };
};

export const addCourreurParticipation = async ({ id, coureur }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateActivitiesCoureur(
        $coureur: [UserTypeInputSchema]
        $updateActivitiesCoureurId: ID
      ) {
        updateActivitiesCoureur(
          coureur: $coureur
          id: $updateActivitiesCoureurId
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      coureur: coureur,
      updateActivitiesCoureurId: id,
    },
  });
  return { data, errors };
};
export const addEncadrantEvent = async ({ id, encadrant }) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation UpdateEncadrantActivite(
        $updateEncadrantActiviteId: ID
        $encadrant: [UserTypeInputSchema]
      ) {
        updateEncadrantActivite(
          id: $updateEncadrantActiviteId
          encadrant: $encadrant
        ) {
          message
          successful
        }
      }
    `,
    variables: {
      encadrant: encadrant,
      updateEncadrantActiviteId: id,
    },
  });
  return { data, errors };
};
