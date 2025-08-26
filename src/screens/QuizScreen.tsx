import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Quiz'>;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'アインシュタインが量子もつれを何と呼んだでしょうか？',
    options: [
      '神秘的な現象',
      '不気味な遠隔作用',
      '奇跡の相関',
      '量子の魔法'
    ],
    correctAnswer: 1,
    explanation: 'アインシュタインは量子もつれを「spooky action at a distance（不気味な遠隔作用）」と呼び、量子力学の不完全性を指摘しようとしました。'
  },
  {
    id: 2,
    question: '2022年のノーベル物理学賞を受賞した研究テーマは？',
    options: [
      'ブラックホールの研究',
      '量子もつれの実験的検証',
      '素粒子物理学の発展',
      '宇宙論の進歩'
    ],
    correctAnswer: 1,
    explanation: '2022年のノーベル物理学賞は、アラン・アスペ、ジョン・クラウザー、アントン・ツァイリンガーが量子もつれの実験的検証と量子情報科学への貢献で受賞しました。'
  },
  {
    id: 3,
    question: '量子もつれの性質として正しいのは？',
    options: [
      '粒子同士の距離に関係なく瞬時に相関する',
      '光の速度で情報が伝わる',
      '電磁波を使って通信する',
      '重力によって引き合う'
    ],
    correctAnswer: 0,
    explanation: '量子もつれでは、もつれた粒子同士がどんなに離れていても、一方の状態を測定すると他方の状態が瞬時に決まります。'
  },
  {
    id: 4,
    question: 'ベルの不等式が証明したことは？',
    options: [
      '量子力学が間違っていること',
      '隠れた変数理論の正しさ',
      '量子もつれが実在すること',
      '相対性理論の限界'
    ],
    correctAnswer: 2,
    explanation: 'ベルの不等式の破れが実験で確認されたことで、量子もつれが実在し、「隠れた変数」による説明では量子現象を完全に記述できないことが証明されました。'
  },
  {
    id: 5,
    question: '量子もつれの応用として期待されているのは？',
    options: [
      'タイムマシンの開発',
      '完全に盗聴不可能な通信',
      '重力制御装置',
      'テレポーテーション装置'
    ],
    correctAnswer: 1,
    explanation: '量子もつれを利用した量子暗号通信は、盗聴を試みると必ず検出されるため、完全に安全な通信の実現が期待されています。'
  }
];

export default function QuizScreen({ navigation }: Props) {
  const { width } = Dimensions.get('window');
  const isWeb = width > 768;
  const styles = getStyles(isWeb);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || answered) return;
    
    setAnswered(true);
    setShowExplanation(true);
    
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setShowExplanation(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return '完璧です！🎉 量子もつれマスター！';
    if (percentage >= 80) return 'すばらしい！🌟 よく理解できています！';
    if (percentage >= 60) return 'なかなか良いです！👍 もう少し復習してみましょう';
    if (percentage >= 40) return 'もう少し！📚 コンテンツをもう一度読んでみましょう';
    return 'がんばって！💪 基礎から学び直してみましょう';
  };

  if (showResult) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>クイズ結果</Text>
            <Text style={styles.resultScore}>
              {score} / {quizQuestions.length} 問正解
            </Text>
            <Text style={styles.resultPercentage}>
              {Math.round((score / quizQuestions.length) * 100)}%
            </Text>
            <Text style={styles.resultMessage}>{getScoreMessage()}</Text>
            
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>もう一度挑戦</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={() => navigation.navigate('Content')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                学習内容を確認
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                ホームに戻る
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← 戻る</Text>
          </TouchableOpacity>
          <Text style={styles.title}>クイズ</Text>
          <Text style={styles.progress}>
            {currentQuestion + 1} / {quizQuestions.length}
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>問題 {question.id}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            let optionStyle = [styles.option];
            if (selectedAnswer === index) {
              if (answered) {
                if (index === question.correctAnswer) {
                  optionStyle.push(styles.correctOption);
                } else {
                  optionStyle.push(styles.incorrectOption);
                }
              } else {
                optionStyle.push(styles.selectedOption);
              }
            } else if (answered && index === question.correctAnswer) {
              optionStyle.push(styles.correctOption);
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={answered}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>解説</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {!answered ? (
            <TouchableOpacity 
              style={[styles.button, selectedAnswer === null && styles.disabledButton]}
              onPress={handleAnswerSubmit}
              disabled={selectedAnswer === null}
            >
              <Text style={styles.buttonText}>回答する</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
              <Text style={styles.buttonText}>
                {currentQuestion < quizQuestions.length - 1 ? '次の問題' : '結果を見る'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (isWeb: boolean) => StyleSheet.create({
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
    marginBottom: 5,
  },
  progress: {
    fontSize: 16,
    color: '#8b92b3',
  },
  questionContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
  },
  questionNumber: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 26,
  },
  optionsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  option: {
    padding: isWeb ? 22 : 18,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    cursor: isWeb ? 'pointer' : 'default',
  },
  selectedOption: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  correctOption: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  explanationContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 15,
    color: '#b8bdd6',
    lineHeight: 22,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: isWeb ? 22 : 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    cursor: isWeb ? 'pointer' : 'default',
  },
  disabledButton: {
    backgroundColor: '#374151',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#6366f1',
  },
  resultContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 24,
    color: '#8b92b3',
    marginBottom: 20,
  },
  resultMessage: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
});