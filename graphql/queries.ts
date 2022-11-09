import gql from 'graphql-tag';

 export const ShowUsers = gql`
   query ShowUsers {
    users (order_by: {puntitos: {presicion: desc}}){
      email
      id
      name
      plan
      picture
      puntitos{  
        puntos
        presicion
        puntuacion
        correctas
        division
        id
        jugadas
        jugador
      }
    }
  }
 `;

export const ShowRank = gql`
query ShowRank{
 stats_scorez(limit: 6) {
   jugador
   pre_rank
   puntuacion
 }
}
`;
export const ShowUser = gql`
query ShowUser ($email:String!){
  users(where: {email: {_eq: $email}}) {
    email
    id
    name
    picture
    plan
  }
}
`;

 export const ShowQuestions = gql`
 query ShowQuestions ($limit: Int = 0){
  preguntas ( limit: $limit){
    id
    correct_option
    options
    question
  }
}
`;
export const ShowScores = gql`
query ShowScores($jugador: String) {
  scores(where: {jugador: {_eq: $jugador}}) {
    correctas
    division
    jugadas
    id
    jugador
    puntos
    presicion
    puntuacion
  }
}
`;
export const ShowScorez = gql`
query ShowScorez($jugador: String!) {
  scorez(where: {jugador: {_eq: $jugador}}) {
    correctas
    jugadas
    id
    jugador
   partidas
    presicion
    puntuacion
    velocidad
  }
}
`;
export const ShowPartidas = gql`
query ShowPartidas($email: String) {
  partidas(where: {email: {_eq: $email}}) {
    promedio_tiempo
    email
    id
    correo
  }
}
`;