import React, { useState,useEffect} from 'react';
import {queries } from '../graphql';
import { Link } from '@react-navigation/native';

import { useQuery } from '@apollo/react-hooks';

import { View, Text, SafeAreaView,Dimensions, StatusBar, Image, TouchableOpacity, Modal, Animated,ScrollView,StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');
export const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    
    success: '#00C851',
    error: '#ff4444',

    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
}
export const SIZES = {
    base: 10,
    width,
    height
}
const Quiz = () => {
    const {    data: { preguntas } = {}, loading,error}= useQuery(queries.ShowQuestions);
   
   

 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [showNextButton, setShowNextButton] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
 const [correctOption, setCorrectOption] = useState(null);
 const [score, setScore] = useState(0);

   
     const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    if (loading) return (<Text>'Loading...'</Text>);
    if (error) return (<Text>`Error! ${error.message}`</Text>);
 
   
    const validateAnswer = (selectedOption) => {
        let correct_option = preguntas[currentQuestionIndex].correct_option;
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
         setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            
            setScore(score+1)
        }
        
        setShowNextButton(true)
    }
    const handleNext = () => {
        if(currentQuestionIndex== preguntas.length-1){
           
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
}
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
     }



    const renderQuestion = () => {
        return (
          
            <View style={{
                marginVertical: 40
            }}>
               
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {preguntas.length}</Text>
                </View>

                
                <Text style={{
                      color: COLORS.white,
                    fontSize: 30
                }}>{preguntas[currentQuestionIndex].question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    preguntas[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                         onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption 
                            ? COLORS.success
                            : option==currentOptionSelected 
                            ? COLORS.error 
                            : COLORS.secondary+'40',
                            backgroundColor: option==correctOption 
                            ? COLORS.success +'20'
                            : option==currentOptionSelected 
                            ? COLORS.error +'20'
                            : COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{option}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}
                             {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Ionicons name="ios-checkmark-circle" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <Ionicons name="ios-close-circle" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ) : null
                            } 

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                 onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Siguiente</Text>
                </TouchableOpacity> 
            )
        }else{
            return null
        }
    }

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, preguntas.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
//       <ScrollView >
      
//   <View  style={{
//         flex: 1,
//         paddingVertical: 20,
//         paddingHorizontal: 16,
//         backgroundColor: "#252C4A",
//         position:'relative'
//     }}>
<SafeAreaView style={{
    flex: 1
}}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
    <View style={{
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
        position:'relative'
    }}>          
    
                           { renderProgressBar() } 

      {renderQuestion()}
      {renderOptions()}
    {renderNextButton()}

    <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (preguntas.length/2) ? 'Buena partida!!' : 'Puedes mejorar!' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (preguntas.length/2) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ { preguntas.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                            backgroundColor: COLORS.accent,
                            padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                                }}>Reiniciar Quiz</Text>
                           </TouchableOpacity>

                       </View>

                   </View>
               </Modal>
  
               <Image
                source={require('../assets/DottedBG.png')}
                style={{
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                />

           </View>
       </SafeAreaView>
        //    </View>
        //    </ScrollView>
           
    )
}

export default Quiz