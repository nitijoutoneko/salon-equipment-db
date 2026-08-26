export type ProductType = '電動昇降' | '手動昇降' | '固定式' | '折りたたみ';
export type UseCase = '整体' | 'エステ' | 'フェイシャル' | 'マッサージ' | '訪問施術';

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  type: ProductType;
  uses: UseCase[];
  width: number;
  length: number;
  minHeight: number;
  maxHeight: number;
  faceHole: boolean;
  reclining: boolean;
  portable: boolean;
  cushion: string;
  upholstery: string;
  color: string;
  tone: number;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: 'p1', slug: 'demo-electric-a101', name: 'デモ電動ベッド A-101', shortName: 'A-101',
    tagline: '日々の高さ調整をスムーズにする電動昇降モデル', type: '電動昇降', uses: ['整体', 'エステ', 'マッサージ'],
    width: 70, length: 185, minHeight: 48, maxHeight: 88, faceHole: true, reclining: false, portable: false,
    cushion: 'サンプル：やや硬め', upholstery: 'サンプル：合成皮革', color: 'セージ', tone: 1,
    description: '施術者ごとの高さ調整を想定した、デモ用の電動昇降モデルです。整体からエステまで幅広い比較画面を確認できる構成です。',
    features: ['フットスイッチ想定', '有孔タイプ', '安定重視の脚部'],
  },
  {
    id: 'p2', slug: 'demo-recline-b202', name: 'デモリクライニング B-202', shortName: 'B-202',
    tagline: 'フェイシャル施術を想定した手動リクライニング', type: '手動昇降', uses: ['エステ', 'フェイシャル'],
    width: 75, length: 190, minHeight: 55, maxHeight: 82, faceHole: false, reclining: true, portable: false,
    cushion: 'サンプル：やわらかめ', upholstery: 'サンプル：合成皮革', color: 'サンド', tone: 2,
    description: '上体を起こす施術の比較に使える、デモ用リクライニングモデルです。ゆとりある幅とクッション性を見比べられます。',
    features: ['手動リクライニング想定', 'ワイド設計', 'フェイシャル向け枕'],
  },
  {
    id: 'p3', slug: 'demo-portable-c303', name: 'デモポータブル C-303', shortName: 'C-303',
    tagline: '持ち運びや収納を想定した折りたたみモデル', type: '折りたたみ', uses: ['訪問施術', 'マッサージ', '整体'],
    width: 65, length: 180, minHeight: 50, maxHeight: 75, faceHole: true, reclining: false, portable: true,
    cushion: 'サンプル：標準', upholstery: 'サンプル：合成皮革', color: 'スレート', tone: 3,
    description: '訪問施術や省スペース運用の比較に使える、デモ用の折りたたみモデルです。持ち運び機能の絞り込みも確認できます。',
    features: ['二つ折り想定', 'キャリーバッグ想定', '高さ段階調整'],
  },
  {
    id: 'p4', slug: 'demo-flat-d404', name: 'デモフラット D-404', shortName: 'D-404',
    tagline: 'シンプルな構成で基本を押さえた固定式モデル', type: '固定式', uses: ['整体', 'マッサージ'],
    width: 60, length: 180, minHeight: 55, maxHeight: 55, faceHole: true, reclining: false, portable: false,
    cushion: 'サンプル：硬め', upholstery: 'サンプル：ビニールレザー', color: 'オリーブ', tone: 4,
    description: '基本的な固定式ベッドの比較に使えるデモモデルです。コンパクトな幅を軸に、設置スペースとの相性を確認できます。',
    features: ['固定高', 'コンパクト幅', '有孔タイプ'],
  },
  {
    id: 'p5', slug: 'demo-electric-e505', name: 'デモ電動ワイド E-505', shortName: 'E-505',
    tagline: 'ゆとりある施術面を想定したワイド電動モデル', type: '電動昇降', uses: ['エステ', '整体', 'フェイシャル'],
    width: 80, length: 195, minHeight: 45, maxHeight: 90, faceHole: true, reclining: true, portable: false,
    cushion: 'サンプル：やわらかめ', upholstery: 'サンプル：合成皮革', color: 'ミスト', tone: 5,
    description: '幅広の施術面とリクライニング機能を比較するためのデモモデルです。複数用途で検索した際の表示確認にも使えます。',
    features: ['電動昇降想定', 'リクライニング想定', 'ワイド設計'],
  },
  {
    id: 'p6', slug: 'demo-light-f606', name: 'デモ軽量ベッド F-606', shortName: 'F-606',
    tagline: '限られたスペースにも合わせやすい軽快なモデル', type: '折りたたみ', uses: ['訪問施術', 'エステ', 'マッサージ'],
    width: 68, length: 185, minHeight: 48, maxHeight: 78, faceHole: false, reclining: true, portable: true,
    cushion: 'サンプル：標準', upholstery: 'サンプル：合成皮革', color: 'アイボリー', tone: 6,
    description: '持ち運びとリクライニングの条件を組み合わせて試せる、デモ用モデルです。複数条件の絞り込み確認に適しています。',
    features: ['折りたたみ想定', '背上げ機能想定', '軽量設計想定'],
  },
];

export const productTypes: ProductType[] = ['電動昇降', '手動昇降', '固定式', '折りたたみ'];
export const useCases: UseCase[] = ['整体', 'エステ', 'フェイシャル', 'マッサージ', '訪問施術'];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
