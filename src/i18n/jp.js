// import { name } from '@vue/eslint-config-prettier/skip-formatting'
// import avatar from 'animal-avatar-generator'
import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    register: '登録',
    login: 'ログイン',
    cart: 'カート',
    orders: '注文',
    admin: 'アドミン管理',
    logout: 'ログアウト',
    adminProducts: '商品管理',
    adminAdopting: '里親待ち管理',
    adminOrders: '注文管理',
    adminUsers: 'ユーザー管理',
    adminCats: '里親待ち管理',
    adminRehomes: '審査待ち管理',
    home: 'ホーム',
    product: '製品',
    about: '私たちについて',
    info: '猫の情報',
    adopt: '猫の里親募集',
    account: '会員専用エリア',
    adopting: '里親待ちエリア',
    agree: '同意書をダウンロード',
    favorites: 'お気に入りリスト',

    // theme: ' ',
  },
  register: {
    submit: 'ユーザーアカウント作成',
    success: '登録成功',
  },
  login: {
    submit: 'ログイン',
    success: 'ログイン成功',
  },
  logout: {
    success: 'ログアウト成功',
  },
  user: {
    account: 'アカウントを入力してください',
    useraccount: '会員アカウント',
    useremail: 'ユーザーのメールアドレス',
    email: 'メールアドレス',
    password: 'パスワードを入力してください',
    passwordConfirm: 'パスワードを再確認してください',
    avatar: 'アバター',
    username: 'ユーザー名',
    role: '役割',
    active: '有効化',
    createdAt: '作成日時',
    updatedAt: '更新日時',
    image: 'プロフィール画像',
  },
  save: {
    success: '保存成功',
    failed: '保存失敗',
  },
  common: {
    submit: '審査提出',
  },
  userRole: {
    user: 'ユーザー',
    admin: '管理者',
  },
  userrole: {
    0: 'ユーザー',
    1: '管理者',
  },
  cart: {
    checkout: 'チェックアウト',
  },
  order: {
    createdAt: '注文日時',
    cart: '商品',
    price: '注文金額',
    account: 'アカウント',
  },
  admin: {
    index: '管理項目を選択',
  },
  adminUser: {
    new: '新しいユーザーを追加',
    edit: '編集',
    cancel: 'キャンセル',
    submit: '確認',
    newSuccess: '追加成功',
    editSuccess: '編集成功',
    exportExcel: 'ユーザー情報エクスポート',
  },
  adminUsers: {
    edit: '管理者編集',
  },
  adminProduct: {
    new: '新しい商品を追加',
    edit: '編集',
    cancel: 'キャンセル',
    submit: '確認',
    newSuccess: '追加成功',
    editSuccess: '編集成功',
  },
  product: {
    image: '画像',
    name: '名前',
    description: '説明',
    price: '価格',
    category: 'カテゴリー',
    sell: '販売状態',
    createdAt: '作成日時',
    updatedAt: '更新日時',
    onSell: '販売中',
    notOnSell: '販売停止',
    addCart: 'カートに追加',
    addCartQuantityInvalid: '数量が正しくありません',
    addCartSuccess: 'カートに追加しました',
  },
  productCategory: {
    food: '食品',
    drink: '飲料',
    music: '音楽',
    phone: '携帯電話',
  },
  adminCat: {
    edit: '編集',
    new: '猫の追加',
    newSuccess: '猫の追加に成功しました',
    editSuccess: '編集に成功しました',
    cancel: 'キャンセル',
    submit: '確定',
    exportExcel: '猫データのエクスポート',
  },
  cat: {
    name: '名前',
    age: '年齢',
    breed: '品種',
    category: 'カテゴリー',
    gender: '性別',
    selectCategory: 'カテゴリーを選択',
    selectBreed: '品種を選択',
    selectGender: '性別を選択',
    image: '画像',
    isAdopting: '里親募集中',
    description: '説明',
    createdAt: '作成日時',
    updatedAt: '更新日時',
    reviewStatus: '審査状態',
  },
  cats: {
    gender: '性別',
  },
  catCategory: {
    black: '黒猫',
    orange: '茶トラ',
    flower: '三毛猫',
    tiger: 'キジトラ',
  },
  catBreed: {
    Male: 'オス',
    Female: 'メス',
    black: '黒猫',
    orange: '茶トラ',
    flower: '三毛猫',
    tiger: 'キジトラ',
    undefined: '不明',
    Persian: 'ペルシャ猫',
  },
  catGender: {
    Male: 'オス',
    male: 'オス',
    Female: 'メス',
    female: 'メス',
  },
  rehome: {
    formTitle: '譲渡フォーム',
    submit: '送信',
    catName: '猫の名前',
    catAge: '猫の年齢',
    catBreed: '猫の品種',
    catGender: '猫の性別',
    catDescription: '猫の説明',
    catImage: '猫の写真',
    email: 'メールアドレス',
    photoHelpText: 'ここにクリックまたはドラッグして写真をアップロード',
    cancel: 'キャンセル',
    catNameRequired: '猫の名前は必須です',
    catAgeRequired: '猫の年齢は必須です',
    catBreedRequired: '猫の品種は必須です',
    catGenderRequired: '猫の性別は必須です',
    catAgeTooSmall: '猫の年齢が正しくありません',
    catPhotoRequired: '猫の写真は必須です',
    emailInvalid: 'メールアドレスの形式が正しくありません',
    emailRequired: 'メールアドレスは必須です',
    photoErrorText: '写真が必要です',
    submitSuccess: '送信成功',
    submitError: '送信失敗',
  },
  home: {
    news: 'ホーム',
  },
  fileAgent: {
    helpText: 'ここにクリックまたはドラッグしてファイルをアップロード',
    errorType: 'ファイル形式が不正です',
    errorSize: 'ファイルサイズが制限を超えています',
  },
  api: {
    userAccountRequired: 'ユーザーアカウントは必須です',
    userAccountTooShort: 'ユーザーアカウントが短すぎます',
    userAccountTooLong: 'ユーザーアカウントが長すぎます',
    userAccountInvalid: 'ユーザーアカウントの形式が不正です',
    userAccountDuplicate: 'ユーザーアカウントが重複しています',
    userPasswordRequired: 'パスワードは必須です',
    userPasswordConfirm: 'もう一度パスワードを入力してください',
    userPasswordTooShort: 'パスワードが短すぎます',
    userPasswordTooLong: 'パスワードが長すぎます',
    userPasswordIncorrect: 'パスワードが間違っています',
    userPasswordNotMatch: 'パスワードが一致しません',
    userEmailRequired: 'メールアドレスは必須です',
    userEmailInvalid: 'メールアドレスの形式が不正です',
    userNotFound: 'ユーザーが見つかりません',
    userPermissionDenied: '権限が不足しています',
    unknownError: '不明なエラー',
    serverError: 'サーバーエラー',
    uploadFailed: 'アップロード失敗',
    limitFileSize: 'ファイルサイズ制限を超えています',
    pleaseSelectFile: 'ファイルを選択してください',
    unsupportedFileFormat: 'サポートされていないファイル形式です',
    catNotFound: '猫が見つかりません',
    CatIdInvalid: '猫のIDが無効です',
    alreadyLiked: 'すでに「いいね！」しました',
    likeSuccess: '「いいね！」に成功しました',
    userNameRequired: 'ユーザー名は必須です',
    userActiveRequired: 'ユーザーの有効化は必須です',
    userRoleRequired: 'ユーザーの役割は必須です',
    catAgeRequired: '猫の年齢は必須です',
    catAgeInvalid: '猫の年齢が無効です',
    catAgeTooSmall: '猫の年齢が正しくありません',
    catBreedRequired: '猫の品種は必須です',
    catGenderRequired: '猫の性別は必須です',
    catNameRequired: '猫の名前は必須です',
    catImageRequired: '猫の画像は必須です',
    catDescriptionRequired: '猫の説明は必須です',
    catIdInvalid: '猫のIDが無効です',
    catIsadoptingRequired: '里親募集状態は必須です',
    isAdopting: '里親募集状態は必須です',
  },
}
