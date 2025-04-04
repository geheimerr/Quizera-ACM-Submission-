import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import quizData from '../assets/quizData.json';

type MultipleChoiceQuestion = {
    type: 'multiple-choice';
    question: string;
    options: string[];
    correctAnswer: number;
};

type SubjectiveQuestion = {
    type: 'subjective';
    question: string;
    sampleAnswer: string;
};

type QuizQuestion = MultipleChoiceQuestion | SubjectiveQuestion;

export default function ProgrammingQuiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
    const [submittedSubjective, setSubmittedSubjective] = useState(false);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(50);
    const [username, setUsername] = useState('');

    const questions = quizData as QuizQuestion[];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsQuizCompleted(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOptionSelect = (optionIndex: number) => {
        const currentQuestion = questions[currentQuestionIndex] as MultipleChoiceQuestion;

        if (currentQuestion.type !== 'multiple-choice') return;

        setSelectedOption(optionIndex);

        if (optionIndex === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
            } else {
                setIsQuizCompleted(true);
            }
        }, 1000);
    };

    const handleSubjectiveSubmit = () => {
        if (subjectiveAnswer.trim().length > 20) {
            setScore(score + 1);
        }

        setSubmittedSubjective(true);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSubjectiveAnswer('');
                setSubmittedSubjective(false);
            } else {
                setIsQuizCompleted(true);
            }
        }, 1000);
    };

    const renderMultipleChoiceOptions = (question: MultipleChoiceQuestion) => {
        return question.options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.optionButton,
                    selectedOption === index && styles.selectedOption,
                    selectedOption !== null &&
                    index === question.correctAnswer &&
                    styles.correctOption,
                    selectedOption === index &&
                    index !== question.correctAnswer &&
                    styles.wrongOption,
                ]}
                onPress={() => handleOptionSelect(index)}
                disabled={selectedOption !== null}
            >
                <Text
                    style={[
                        styles.optionText,
                        selectedOption === index &&
                        index !== question.correctAnswer &&
                        styles.wrongOptionText
                    ]}
                >
                    {option}
                </Text>
            </TouchableOpacity>
        ));
    };

    const renderSubjectiveQuestion = (question: SubjectiveQuestion) => {
        return (
            <View style={styles.subjectiveContainer}>
                <TextInput
                    style={styles.subjectiveInput}
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    value={subjectiveAnswer}
                    onChangeText={setSubjectiveAnswer}
                    placeholder="Type your answer here..."
                    editable={!submittedSubjective}
                />
                {!submittedSubjective ? (
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubjectiveSubmit}
                        disabled={subjectiveAnswer.trim().length < 10}
                    >
                        <Text style={styles.submitButtonText}>Submit Answer</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>
                            Answer submitted. Sample answer could be:
                        </Text>
                        <Text style={styles.sampleAnswerText}>
                            {question.sampleAnswer}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    const handleFinish = () => {
        router.push({
            pathname: "/leaderboard",
            params: { score: score, username: username }
        });
    };

    if (isQuizCompleted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.quizCompletedContainer}>
                    <Text style={styles.quizCompletedText}>Quiz Completed!</Text>
                    <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
                    <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                        <Text style={styles.finishButtonText}>View Leaderboard</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.timerText}>Time: {timeRemaining}s</Text>
                <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionNumber}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Text>
                    <Text style={styles.questionText}>
                        {currentQuestion.question}
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {currentQuestion.type === 'multiple-choice'
                        ? renderMultipleChoiceOptions(currentQuestion as MultipleChoiceQuestion)
                        : renderSubjectiveQuestion(currentQuestion as SubjectiveQuestion)
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionNumber: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    optionsContainer: {
        marginTop: 10,
    },
    optionButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedOption: {
        borderColor: '#3498db',
        borderWidth: 2,
    },
    correctOption: {
        backgroundColor: '#d4edda',
        borderColor: '#28a745',
    },
    wrongOption: {
        backgroundColor: '#f8d7da',
        borderColor: '#dc3545',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    wrongOptionText: {
        color: '#dc3545',
    },
    subjectiveContainer: {
        marginBottom: 20,
    },
    subjectiveInput: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        minHeight: 150,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    feedbackContainer: {
        backgroundColor: '#f1f9ff',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a8d4f5',
    },
    feedbackText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    sampleAnswerText: {
        fontSize: 16,
        color: '#333',
        fontStyle: 'italic',
    },
    quizCompletedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizCompletedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    finishButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    finishButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});