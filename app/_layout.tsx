import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './darkmode';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    useEffect(() => {
        async function hideSplash() {
            if (appIsReady) {
                await SplashScreen.hideAsync();
            }
        }

        hideSplash();
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <ThemeProvider>
            <SafeAreaView style={styles.safeArea}>
                <TabsLayout />
            </SafeAreaView>
        </ThemeProvider>
    );
}

function TabsLayout() {
    const { theme, isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Tabs
                sceneContainerStyle={[styles.sceneContainer, { backgroundColor: theme.background }]}
                screenOptions={{
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: theme.headerBackground,
                        borderTopWidth: 0,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: 70,
                        marginHorizontal: 10,
                        marginBottom: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.4,
                        shadowOffset: { width: 0, height: 5 },
                        shadowRadius: 10,
                        elevation: 10,
                    },
                    tabBarActiveTintColor: theme.headerText,
                    tabBarInactiveTintColor: theme.headerSubtitle,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '600',
                    },
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: theme.background,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Quizzes',
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={{
                                    backgroundColor: focused ? (isDarkMode ? '#333333' : '#D3D3D3') : 'transparent',
                                    borderRadius: 15,
                                    padding: focused ? 9 : 0,
                                    shadowColor: isDarkMode ? '#000000' : '#B3B3B3',
                                    shadowOpacity: focused ? 0.7 : 0,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowRadius: focused ? 12 : 0,
                                }}
                            >
                                <Ionicons
                                    name={focused ? 'book' : 'book-outline'}
                                    size={size}
                                    color={color}
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="leaderboard"
                    options={{
                        title: 'Leaderboard',
                        tabBarIcon: ({ focused, color, size }) => (
                            <View
                                style={{
                                    backgroundColor: focused ? (isDarkMode ? '#333333' : '#D3D3D3') : 'transparent',
                                    borderRadius: 15,
                                    padding: focused ? 9 : 0,
                                    shadowColor: isDarkMode ? '#000000' : '#B3B3B3',
                                    shadowOpacity: focused ? 0.7 : 0,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowRadius: focused ? 12 : 0,
                                }}
                            >
                                <Ionicons
                                    name={focused ? 'trophy' : 'trophy-outline'}
                                    size={size}
                                    color={color}
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="programming-quiz"
                    options={{
                        tabBarButton: () => null,
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    sceneContainer: {
        flex: 1,
    },
});