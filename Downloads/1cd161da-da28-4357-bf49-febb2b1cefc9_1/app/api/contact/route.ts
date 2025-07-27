import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== Contact Form API Called ===');
  try {
    const body = await request.json();
    console.log('Received body:', body);
    const { company, name, email, industry, message } = body;

    // 必須フィールドのバリデーション
    if (!company || !name || !email || !message) {
      console.log('Validation failed - missing required fields');
      return NextResponse.json(
        { error: '必須項目が入力されていません。' },
        { status: 400 }
      );
    }

    // メールアドレスの簡単なバリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email format');
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください。' },
        { status: 400 }
      );
    }

    console.log('Validation passed, preparing to send email');

    // メール送信処理（Resend APIを使用）
    const emailContent = `
新しいお問い合わせが届きました。

会社名: ${company}
お名前: ${name}
メールアドレス: ${email}
業種: ${industry || '未選択'}

お問い合わせ内容:
${message}

---
このメールはAI House Devのお問い合わせフォームから送信されました。
    `.trim();

    // Resend APIキーが設定されているかチェック
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;
    console.log('Resend API Key present:', !!resendApiKey, 'Valid:', resendApiKey !== 'your_resend_api_key_here');

    if (resendApiKey && resendApiKey !== 'your_resend_api_key_here') {
      // Resend APIを使用してメール送信
      console.log('Attempting to send email via Resend API');
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'AI House Dev <noreply@aihousedev.com>', // 実際のドメインに変更してください
            to: ['k.sho626626@gmail.com'],
            reply_to: email,
            subject: `【AI House Dev】新しいお問い合わせ - ${company}様`,
            text: emailContent,
          }),
        });

        if (resendResponse.ok) {
          console.log('Resend API email sent successfully');
          emailSent = true;
        } else {
          const errorText = await resendResponse.text();
          console.error('Resend API error:', errorText);
        }
      } catch (error) {
        console.error('Resend API error:', error);
      }
    } else {
      console.log('Resend API not configured, using Gmail fallback');
    }

    // Resendが失敗した場合、フォールバック：Gmail SMTP使用
    if (!emailSent) {
      console.log('Attempting to send email via Gmail SMTP');
      const fallbackResponse = await sendEmailWithGmail({
        to: 'k.sho626626@gmail.com',
        subject: `【AI House Dev】新しいお問い合わせ - ${company}様`,
        text: emailContent,
        replyTo: email,
      });

      console.log('Gmail fallback result:', fallbackResponse);
      if (!fallbackResponse.success) {
        throw new Error('メール送信に失敗しました');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'お問い合わせありがとうございます。48時間以内にご返信いたします。'
    });

  } catch (error) {
    console.error('=== Contact form error ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Full error object:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。恐れ入りますが、再度お試しください。' },
      { status: 500 }
    );
  }
}

// Gmail SMTP経由での送信（フォールバック用）
async function sendEmailWithGmail(params: {
  to: string;
  subject: string;
  text: string;
  replyTo: string;
}) {
  try {
    // Gmail設定が正しく設定されているかチェック
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailUser || !gmailPassword) {
      console.error('Gmail credentials not configured');
      return { success: false };
    }

    // nodemailerを使用（環境変数でGmail設定が必要）
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword.replace(/\s/g, ''), // スペースを除去
      },
    });

    // メール送信をテスト
    await transporter.verify();

    await transporter.sendMail({
      from: gmailUser,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      text: params.text,
    });

    return { success: true };
  } catch (error) {
    console.error('Gmail sending failed:', error);
    return { success: false };
  }
}