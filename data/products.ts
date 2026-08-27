export type LiftType = '電動' | '手動' | '固定';
export type UseCase = '整体' | 'リラクゼーション' | 'エステ' | 'フェイシャル' | '訪問施術';
export type PurchaseProvider = 'Amazon' | '楽天市場' | 'Yahoo!ショッピング' | 'メーカー公式' | '中古';

export type PurchaseLink = {
  provider: PurchaseProvider;
  label: string;
  url: string | null;
  price: number | null;
};

export type Product = {
  id: string;
  slug: string;
  manufacturer: string;
  name: string;
  shortName: string;
  modelNumber: string;
  image: string | null;
  price: number;
  width: number;
  length: number;
  minHeight: number;
  maxHeight: number;
  weight: number;
  loadCapacity: number;
  liftType: LiftType;
  electricLift: boolean;
  reclining: boolean;
  portable: boolean;
  faceHole: boolean;
  cushionThickness: number;
  upholstery: string;
  uses: UseCase[];
  featureSummary: string;
  features: string[];
  benefits: string[];
  cautions: string[];
  purchaseLinks: PurchaseLink[];
  tone: number;
};

const unavailableStores: PurchaseLink[] = [
  { provider: 'Amazon', label: 'Amazonで見る', url: null, price: null },
  { provider: '楽天市場', label: '楽天市場で見る', url: null, price: null },
  { provider: 'Yahoo!ショッピング', label: 'Yahoo!ショッピングで見る', url: null, price: null },
  { provider: 'メーカー公式', label: 'メーカー公式で見る', url: null, price: null },
  { provider: '中古', label: '中古を探す', url: null, price: null },
];

export const products: Product[] = [
  {
    id: 'demo-a101', slug: 'demo-electric-a101', manufacturer: 'DEMO MEDICAL', name: 'デモ電動昇降ベッド A-101', shortName: 'A-101', modelNumber: 'DM-A101', image: null,
    price: 128000, width: 70, length: 185, minHeight: 48, maxHeight: 88, weight: 52, loadCapacity: 180,
    liftType: '電動', electricLift: true, reclining: false, portable: false, faceHole: true, cushionThickness: 6,
    upholstery: 'デモ合成皮革', uses: ['整体', 'リラクゼーション'], tone: 1,
    featureSummary: '高さ調整の頻度が多い施術室を想定した、標準幅の電動モデル。',
    features: ['フットスイッチ想定', '有孔タイプ', '水平昇降のデモ仕様'],
    benefits: ['施術者に合わせて高さを変えやすい', '整体とリラクの両方で比較しやすい'],
    cautions: ['電源位置の確認が必要', '重量があるため常設向け'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-b202', slug: 'demo-recline-b202', manufacturer: 'SALON LAB（架空）', name: 'デモ手動リクライニング B-202', shortName: 'B-202', modelNumber: 'SL-B202', image: null,
    price: 79800, width: 75, length: 190, minHeight: 55, maxHeight: 82, weight: 36, loadCapacity: 150,
    liftType: '手動', electricLift: false, reclining: true, portable: false, faceHole: false, cushionThickness: 8,
    upholstery: 'デモ合成皮革', uses: ['エステ', 'フェイシャル'], tone: 2,
    featureSummary: 'フェイシャル施術向けの背上げ機能を想定したワイドモデル。',
    features: ['手動リクライニング想定', '幅75cm', '厚めクッションのデモ仕様'],
    benefits: ['上体を起こす施術を想定できる', 'ゆとりある施術面'],
    cautions: ['幅が広いため設置動線を確認', '電動昇降には非対応'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-c303', slug: 'demo-portable-c303', manufacturer: 'MOBILE CARE（架空）', name: 'デモ折りたたみベッド C-303', shortName: 'C-303', modelNumber: 'MC-C303', image: null,
    price: 32800, width: 65, length: 180, minHeight: 50, maxHeight: 75, weight: 14, loadCapacity: 120,
    liftType: '手動', electricLift: false, reclining: false, portable: true, faceHole: true, cushionThickness: 5,
    upholstery: 'デモPVCレザー', uses: ['訪問施術', 'リラクゼーション'], tone: 3,
    featureSummary: '持ち運びと収納を優先した、訪問施術向けの折りたたみモデル。',
    features: ['二つ折り想定', 'キャリーバッグ想定', '段階式高さ調整'],
    benefits: ['収納しやすい', '比較的軽量なデモ設定'],
    cautions: ['常設型より安定性の確認が重要', '耐荷重は用途との照合が必要'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-d404', slug: 'demo-flat-d404', manufacturer: 'CLINIC BASE（架空）', name: 'デモ固定式フラット D-404', shortName: 'D-404', modelNumber: 'CB-D404', image: null,
    price: 46800, width: 60, length: 180, minHeight: 55, maxHeight: 55, weight: 28, loadCapacity: 200,
    liftType: '固定', electricLift: false, reclining: false, portable: false, faceHole: true, cushionThickness: 4,
    upholstery: 'デモビニールレザー', uses: ['整体', 'リラクゼーション'], tone: 4,
    featureSummary: '設置面積を抑えた、シンプルな固定高のフラットモデル。',
    features: ['固定高55cm', '幅60cm', '有孔タイプ'],
    benefits: ['構造がシンプル', '省スペースで比較しやすい'],
    cautions: ['高さを変更できない', '施術者の身長との相性確認が必要'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-e505', slug: 'demo-electric-e505', manufacturer: 'ESTHE TECH（架空）', name: 'デモ電動リクライニング E-505', shortName: 'E-505', modelNumber: 'ET-E505', image: null,
    price: 248000, width: 80, length: 195, minHeight: 45, maxHeight: 90, weight: 68, loadCapacity: 200,
    liftType: '電動', electricLift: true, reclining: true, portable: false, faceHole: true, cushionThickness: 9,
    upholstery: 'デモ高耐久レザー', uses: ['エステ', 'フェイシャル', 'リラクゼーション'], tone: 5,
    featureSummary: '電動昇降と背上げの両方を想定した、ワイドな多機能モデル。',
    features: ['電動昇降想定', '電動リクライニング想定', '幅80cm'],
    benefits: ['施術姿勢の切り替えを想定できる', '幅広いエステ施術を比較可能'],
    cautions: ['設置面積と電源を要確認', '重量が大きく移動には不向き'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-f606', slug: 'demo-light-f606', manufacturer: 'MOBILE CARE（架空）', name: 'デモ軽量リクライニング F-606', shortName: 'F-606', modelNumber: 'MC-F606', image: null,
    price: 54800, width: 68, length: 185, minHeight: 48, maxHeight: 78, weight: 18, loadCapacity: 130,
    liftType: '手動', electricLift: false, reclining: true, portable: true, faceHole: false, cushionThickness: 6,
    upholstery: 'デモ合成皮革', uses: ['訪問施術', 'エステ', 'フェイシャル'], tone: 6,
    featureSummary: '折りたたみと背上げ機能を組み合わせた軽量デモモデル。',
    features: ['折りたたみ想定', '背上げ機能想定', '重量18kgのデモ仕様'],
    benefits: ['訪問エステの比較候補にしやすい', '収納を想定した設計'],
    cautions: ['固定式より揺れの確認が重要', '持ち運び時の寸法は未登録'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-g707', slug: 'demo-electric-g707', manufacturer: 'CLINIC BASE（架空）', name: 'デモ電動ハイロー G-707', shortName: 'G-707', modelNumber: 'CB-G707', image: null,
    price: 168000, width: 65, length: 190, minHeight: 42, maxHeight: 92, weight: 58, loadCapacity: 220,
    liftType: '電動', electricLift: true, reclining: false, portable: false, faceHole: true, cushionThickness: 5,
    upholstery: 'デモ抗菌レザー', uses: ['整体'], tone: 2,
    featureSummary: '低床から高位置までの調整幅を比較するための整体向けモデル。',
    features: ['高さ42〜92cm', '耐荷重220kgのデモ値', '有孔タイプ'],
    benefits: ['高さ範囲を重視した比較が可能', '幅65cmで施術者が近づきやすい'],
    cautions: ['リクライニング非対応', '重量58kgで常設向け'], purchaseLinks: unavailableStores,
  },
  {
    id: 'demo-h808', slug: 'demo-fixed-h808', manufacturer: 'SALON LAB（架空）', name: 'デモエステフラット H-808', shortName: 'H-808', modelNumber: 'SL-H808', image: null,
    price: 69800, width: 75, length: 185, minHeight: 60, maxHeight: 60, weight: 31, loadCapacity: 160,
    liftType: '固定', electricLift: false, reclining: true, portable: false, faceHole: false, cushionThickness: 10,
    upholstery: 'デモソフトレザー', uses: ['エステ', 'リラクゼーション'], tone: 1,
    featureSummary: 'クッション性と施術面の広さを比較するエステ向け固定モデル。',
    features: ['クッション厚10cm', '手動背上げ想定', '幅75cm'],
    benefits: ['長時間施術を想定した比較が可能', 'シンプルな固定式'],
    cautions: ['高さ60cm固定', '搬入経路の確認が必要'], purchaseLinks: unavailableStores,
  },
];

export const liftTypes: LiftType[] = ['電動', '手動', '固定'];
export const useCases: UseCase[] = ['整体', 'リラクゼーション', 'エステ', 'フェイシャル', '訪問施術'];

export function formatPrice(price: number) {
  return `¥${price.toLocaleString('ja-JP')}`;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
