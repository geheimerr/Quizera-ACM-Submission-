import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './darkmode';
import { DarkModeButton } from './DarkModeButton';

const LEADERBOARD_DATA = [
    { id: '1', rank: 1, name: 'Harvey Specter', points: 110 },
    { id: '2', rank: 2, name: 'Lucfier Morningstar', points: 90 },
    { id: '3', rank: 3, name: 'Chota Bheem', points: 85 },
];

export default function LeaderboardScreen() {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <StatusBar barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

            <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
                <View style={styles.headerContent}>
                    <Text style={[styles.title, { color: theme.headerText }]}>Leaderboard</Text>
                    <Text style={[styles.subtitle, { color: theme.headerSubtitle }]}>Top quiz performers</Text>
                </View>
                <DarkModeButton />
            </View>

            <FlatList
                data={LEADERBOARD_DATA}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                style={[styles.list, { backgroundColor: theme.background }]}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, { backgroundColor: theme.cardBackground }]}>
                        <View style={[styles.rankContainer, { backgroundColor: theme.isDarkMode ? '#333333' : '#F0F0F0' }]}>
                            <Text style={[styles.rankText, { color: theme.primaryText }]}>{item.rank}</Text>
                        </View>

                        <View style={styles.userInfo}>
                            <Text style={[styles.userName, { color: theme.primaryText }]}>{item.name}</Text>
                            <View style={styles.pointsContainer}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={[styles.pointsText, { color: theme.secondaryText }]}>{item.points} points</Text>
                            </View>
                        </View>

                        {item.rank <= 3 && (
                            <Ionicons
                                name="trophy"
                                size={24}
                                color={item.rank === 1 ? '#FFD700' : item.rank === 2 ? '#C0C0C0' : '#CD7F32'}
                                style={styles.trophy}
                            />
                        )}
                    </View>
                )}
            />
        </SafeAreaView>
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
    list: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    listItem: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 10,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    rankContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rankText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointsText: {
        marginLeft: 4,
        fontSize: 14,
    },
    trophy: {
        marginLeft: 8,
    }
});