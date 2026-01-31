/**
 * 単語データ（設計書 docs/design.md 準拠）
 */
export type Word = {
  id: string;
  fr: string;
  ja: string;
  pos?: "noun" | "verb" | "adj";
  exampleFr?: string;
  exampleJa?: string;
};

/**
 * 学習履歴（設計書 docs/design.md 準拠）
 * level: 0=知らない, 1=微妙, 2=覚えた
 */
export type Progress = {
  wordId: string;
  level: 0 | 1 | 2 | 3;
  lastReviewedAt: string;
};

/**
 * 回答状況フラグ
 * - mastered: 2連続で正解（覚えた）
 * - unfixed: 1連続で正解（未定着）
 * - learning: 直近不正解（学習中）
 */
export type WordStatus = "mastered" | "unfixed" | "learning" | null;
