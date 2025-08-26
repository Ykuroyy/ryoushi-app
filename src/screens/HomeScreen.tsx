import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');
const isWeb = width > 768;
const isMobile = width <= 768;

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>量子もつれ</Text>
          <Text style={styles.subtitle}>Quantum Entanglement</Text>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>⚛️</Text>
          <Text style={styles.heroText}>
            アインシュタインが「不気味な遠隔作用」と呼んだ
          </Text>
          <Text style={styles.heroSubtext}>
            量子の不思議な世界へようこそ
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>このアプリで学べること</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🔬</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>基礎から理解</Text>
              <Text style={styles.featureDescription}>
                量子もつれの基本概念を分かりやすく解説
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🚀</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>最新の研究</Text>
              <Text style={styles.featureDescription}>
                2022年ノーベル物理学賞の内容も含む最新情報
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureEmoji}>🧠</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>クイズで確認</Text>
              <Text style={styles.featureDescription}>
                理解度をチェックできる5問のクイズ付き
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('Content')}
        >
          <Text style={styles.startButtonText}>学習を始める</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.quizButtonText}>クイズに挑戦</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    minHeight: isWeb ? '100vh' : undefined,
  },
  scrollContent: {
    paddingBottom: 30,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b92b3',
    letterSpacing: 2,
  },
  heroCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginHorizontal: 20,
    padding: isWeb ? 40 : 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  heroEmoji: {
    fontSize: isWeb ? 80 : 60,
    marginBottom: 15,
  },
  heroText: {
    fontSize: isWeb ? 22 : 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  heroSubtext: {
    fontSize: 14,
    color: '#8b92b3',
    textAlign: 'center',
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: isWeb ? 20 : 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#8b92b3',
    lineHeight: 18,
  },
  startButton: {
    backgroundColor: '#6366f1',
    marginHorizontal: 20,
    marginTop: 30,
    padding: isWeb ? 22 : 18,
    borderRadius: 15,
    alignItems: 'center',
    cursor: isWeb ? 'pointer' : 'default',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6366f1',
    marginHorizontal: 20,
    marginTop: 15,
    padding: isWeb ? 22 : 18,
    borderRadius: 15,
    alignItems: 'center',
    cursor: isWeb ? 'pointer' : 'default',
  },
  quizButtonText: {
    color: '#6366f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});