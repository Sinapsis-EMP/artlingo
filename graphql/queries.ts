import gql from 'graphql-tag';

 export const ShowUsers = gql`
   query ShowUsers {
    users (order_by: {puntitos: {puntos: desc}}){
      email
      id
      name
      plan
      puntitos{  
        puntos
        correctas
        division
        id
        jugadas
        jugador
      }
    }
  }
 `;
 
 export const ShowQuestions = gql`
 query ShowQuestions {
  preguntas {
    id
    correct_option
    options
    question
  }
}
`;
