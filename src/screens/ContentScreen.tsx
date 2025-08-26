import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');
const isWeb = width > 768;

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Content'>;
};

const contentSections = [
  {
    id: 'basics',
    title: '量子もつれとは？',
    emoji: '🌌',
    content: `量子もつれ（Quantum Entanglement）は、2つ以上の粒子が特別な関係で結ばれ、どんなに離れていても瞬時に影響し合う現象です。

一方の粒子の状態を観測すると、もう一方の粒子の状態が瞬時に決まります。この「瞬時」は光の速度を超えているように見えるため、アインシュタインは「不気味な遠隔作用（spooky action at a distance）」と呼びました。`,
  },
  {
    id: 'example',
    title: '身近な例で理解する',
    emoji: '🎲',
    content: `量子もつれを理解するために、特殊な「量子サイコロ」のペアを想像してください。

1. この2つのサイコロは、どんなに離れていても「もつれた」状態にあります
2. 東京で一方のサイコロを振って「6」が出たら、同時にニューヨークのもう一方は必ず「1」になります
3. でも振るまでは、両方とも「1〜6全ての可能性が重なった状態」にあります

これが量子もつれの不思議な性質です！`,
  },
  {
    id: 'history',
    title: '歴史と発展',
    emoji: '📚',
    content: `1935年：アインシュタイン、ポドルスキー、ローゼンが「EPRパラドックス」を提唱
- 量子力学の不完全性を指摘しようとした思考実験

1964年：ジョン・ベルが「ベルの不等式」を発表
- 量子もつれが実在することを実験で検証可能に

1972年：初めての実験的検証
- クラウザーとフリードマンが光子を使って実証

2022年：ノーベル物理学賞
- アラン・アスペ、ジョン・クラウザー、アントン・ツァイリンガーが受賞
- 量子もつれの実験的検証と量子情報科学への貢献が評価`,
  },
  {
    id: 'latest',
    title: '最新の研究と応用',
    emoji: '🚀',
    content: `2024年の最新研究動向：

【量子通信】
- 中国の量子通信衛星「墨子号」が地上7,600kmの量子もつれ通信に成功
- 完全に盗聴不可能な通信の実現へ

【量子コンピュータ】
- GoogleやIBMが量子もつれを利用した計算で「量子超越性」を実証
- 従来のコンピュータでは不可能な計算が可能に

【量子インターネット】
- オランダで世界初の量子インターネットのプロトタイプが稼働
- 2030年代の実用化を目指す

【医療応用】
- 量子センサーによる超高感度MRIの開発
- がん細胞の早期発見が可能に`,
  },
  {
    id: 'future',
    title: '未来への展望',
    emoji: '✨',
    content: `量子もつれが変える私たちの未来：

【2030年代】
- 量子暗号通信の商用化
- 新薬開発への量子コンピュータ活用

【2040年代】
- 量子インターネットの普及
- 量子センサーによる医療診断の一般化

【解明されていない謎】
- なぜ量子もつれが起こるのか？
- 意識と量子もつれの関係は？
- マクロな物体でも量子もつれは可能か？

これらの謎の解明が、物理学の新たな革命をもたらすかもしれません。`,
  },
];

export default function ContentScreen({ navigation }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>('basics');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← 戻る</Text>
          </TouchableOpacity>
          <Text style={styles.title}>量子もつれを学ぶ</Text>
        </View>

        {contentSections.map((section) => (
          <View key={section.id} style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionEmoji}>{section.emoji}</Text>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.expandIcon}>
                {expandedSection === section.id ? '−' : '+'}
              </Text>
            </TouchableOpacity>
            
            {expandedSection === section.id && (
              <View style={styles.sectionContent}>
                <Text style={styles.contentText}>{section.content}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.bottomSection}>
          <Text style={styles.bottomTitle}>理解度をチェック！</Text>
          <Text style={styles.bottomDescription}>
            量子もつれについて学んだことを、クイズで確認してみましょう
          </Text>
          <TouchableOpacity 
            style={styles.quizButton}
            onPress={() => navigation.navigate('Quiz')}
          >
            <Text style={styles.quizButtonText}>クイズに挑戦する →</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#6366f1',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isWeb ? 22 : 18,
    cursor: isWeb ? 'pointer' : 'default',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  expandIcon: {
    fontSize: 24,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  sectionContent: {
    paddingHorizontal: isWeb ? 22 : 18,
    paddingBottom: isWeb ? 22 : 18,
  },
  contentText: {
    fontSize: isWeb ? 16 : 15,
    color: '#b8bdd6',
    lineHeight: isWeb ? 26 : 24,
  },
  bottomSection: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    alignItems: 'center',
  },
  bottomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bottomDescription: {
    fontSize: 14,
    color: '#8b92b3',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  quizButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: isWeb ? 35 : 30,
    paddingVertical: isWeb ? 18 : 15,
    borderRadius: 12,
    cursor: isWeb ? 'pointer' : 'default',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});