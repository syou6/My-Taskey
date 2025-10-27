# メール送信設定手順

お問い合わせフォームからk.sho626626@gmail.comにメールが送信されるように設定するための手順です。

## 方法1: Resend API（推奨）

Resendは開発者向けのメール送信サービスで、簡単に設定できます。

### 手順:

1. [Resend](https://resend.com) にアクセスしてアカウントを作成
2. ダッシュボードで「API Keys」に移動
3. 新しいAPI Keyを作成
4. `.env.local`ファイルの`RESEND_API_KEY`にAPI Keyを設定

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**注意**: 無料プランでは月100通まで送信可能です。

## 方法2: Gmail SMTP（フォールバック）

GoogleアカウントのSMTP機能を使用してメール送信します。

### 手順:

1. Googleアカウントで2段階認証を有効にする
2. [Googleアカウント設定](https://myaccount.google.com/security) → 「2段階認証プロセス」
3. 「アプリパスワード」を生成
4. `.env.local`ファイルに設定

```env
GMAIL_USER=k.sho626626@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

## テスト方法

1. 開発サーバーを起動: `npm run dev`
2. ブラウザで http://localhost:3000 にアクセス
3. お問い合わせフォームに情報を入力して送信
4. k.sho626626@gmail.com でメールを確認

## トラブルシューティング

### メール送信が失敗する場合:

1. `.env.local`ファイルが正しく設定されているか確認
2. Resend APIキーが有効か確認
3. Gmail アプリパスワードが正しく設定されているか確認
4. ブラウザの開発者ツールでエラーメッセージを確認

### よくあるエラー:

- `Authentication failed`: Gmail アプリパスワードが間違っている
- `API key invalid`: Resend APIキーが間違っている
- `Domain not verified`: Resendでドメイン認証が必要（無料プランでは不要）

## 本番環境での注意事項

1. 本番環境では必ず環境変数を設定してください
2. `.env.local`ファイルは本番環境にアップロードしないでください
3. Vercel等のホスティングサービスでは、ダッシュボードで環境変数を設定してください

## セキュリティ

- API KeyやパスワードをGitリポジトリにコミットしないでください
- `.gitignore`に`.env.local`が含まれていることを確認してください