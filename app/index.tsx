import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './darkmode';
import { DarkModeButton } from './DarkModeButton.tsx';
import { router } from 'expo-router';

export default function QuizzesScreen() {
    const { theme } = useTheme();

    const navigateToProgrammingQuiz = (quizType) => {
        router.push({
            pathname: "/programming-quiz",
            params: { quizType }
        });
    };
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <View style={styles.headerContent}>
                    <Text style={[styles.title, { color: theme.headerText }]}>Quizzes</Text>
                    <Text style={[styles.subtitle, { color: theme.headerSubtitle }]}>Practice your skills</Text>
                </View>
                <DarkModeButton />
            </View>

            <ScrollView
                style={[styles.scrollView, { backgroundColor: theme.background }]}
                contentContainerStyle={styles.scrollContent}
            >
                <QuizItem
                    title="Introduction to Programming"
                    description="Test yourself by learning about the basics of coding."
                    icon="code-outline"
                    theme={theme}
                    onPress={() => navigateToProgrammingQuiz('programming')}
                />

                <QuizItem
                    title="General Knowledge"
                    description="Get up to speed with everything that is happening in the country and the world."
                    icon="globe-outline"
                    theme={theme}
                    onPress={() => navigateToProgrammingQuiz('general')}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

function QuizItem({ title, description, icon, theme, onPress }) {
    return (
        <View style={[styles.quizCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.quizHeader}>
                <Ionicons name={icon} size={28} color={theme.primaryText} />
                <View style={styles.quizInfo}>
                    <Text style={[styles.quizTitle, { color: theme.primaryText }]}>{title}</Text>
                    <Text style={[styles.quizDesc, { color: theme.secondaryText }]}>{description}</Text>
                </View>
            </View>

            <View style={[styles.quizFooter, { borderTopColor: theme.isDarkMode ? '#333333' : '#F0F0F0' }]}>
                <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: theme.accentColor }]}
                    onPress={onPress}
                >
                    <Text style={[styles.startButtonText, { color: theme.isDarkMode ? '#000000' : '#000000' }]}>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 25,
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContent: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 5,
    },
    quizCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quizHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    quizInfo: {
        marginLeft: 12,
        flex: 1,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    quizDesc: {
        fontSize: 14,
    },
    quizFooter: {
        borderTopWidth: 1,
        paddingTop: 16,
    },
    startButton: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    startButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});