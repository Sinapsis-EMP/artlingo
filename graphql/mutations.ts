import gql from 'graphql-tag';


export const CreateScore = gql`
mutation CreateScore ($jugador: String, $correctas: Int = 0, $jugadas: Int = 0, $puntos: Int = 0) {
    insert_scores(objects: {jugador: $jugador, correctas: $correctas, jugadas: $jugadas, puntos: $puntos, division: "Bronce"}) {
      returning {
        correctas
        division
        jugadas
        jugador
        id
        puntos
        puntuacion
      }
    }
  }
  `;
  export const UpdateScores = gql`
  mutation UpdateScores($jugador: String!, $correctas: Int!, $jugadas: Int!, $puntos: Int!) {
    update_scores(where: {jugador: {_eq: $jugador}}, _inc: {correctas: $correctas, jugadas: $jugadas, puntos: $puntos}) {
      affected_rows
    }
  }
  `;
 
  export const UpdateScorez = gql`
  mutation UpdateScorez($correctas: Int!, $jugadas: Int!,$partidas: Int! $presicion: numeric!, $puntuacion: numeric!, $velocidad: numeric!, $jugador: String!) {
    update_scorez(_inc: {correctas: $correctas, jugadas: $jugadas, partidas:$partidas}, _set: {presicion: $presicion, puntuacion: $puntuacion, velocidad: $velocidad}, where:{jugador: {_eq: $jugador}}) {
      affected_rows
    }
  }
  `;
  export const UpdatePre = gql`
  mutation UpdatePre($jugador: String!, $presicion: numeric!) {
    update_scores(where: {jugador: {_eq: $jugador}}, _set: {presicion: $presicion}) {
      affected_rows
    }
  }
  `;
  export const UpdatePunt = gql`
  mutation UpdatePunt($jugador: String!,$puntuacion:numeric!) {
    update_scores(where: {jugador: {_eq: $jugador}}, _set: { puntuacion: $puntuacion}) {
      affected_rows
    }
  }
  `;
  
  export const InsertSes = gql`
  mutation InsertSes($email: String!,$correo:String!, $promedio_tiempo: numeric!) {
    insert_partidas_one(object: {email: $email,correo:$correo, promedio_tiempo: $promedio_tiempo}) {
      email
      id
      correo
      sesion
      promedio_tiempo
    }
  }
  `;