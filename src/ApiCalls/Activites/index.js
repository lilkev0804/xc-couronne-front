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
}) => {
  const { data, errors } = await xcApollo.mutate({
    mutation: gql`
      mutation CreateActivities(
        $name: String
        $discipline: EMUN_MODEL_TYPE_RACE_FORMAT
        $date: String
        $creator: String
        $hour: String
        $zipcode: String
        $ville: String
        $denivele: Int
        $distance: Int
      ) {
        createActivities(
          name: $name
          discipline: $discipline
          date: $date
          creator: $creator
          hour: $hour
          zipcode: $zipcode
          ville: $ville
          denivele: $denivele
          distance: $distance
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
          encadrant
          hour
          id
          name
          discipline
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
          coureur {
            id
            username
          }
          zipcode
          ville
          name
          id
          hour
          encadrant
          distance
          discipline
          denivele
          date
          creator
          podium {
            id
            username
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
