
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // フォームデータの取得
    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get('company'),
      name: formData.get('name'),
      email: formData.get('email'),
      industry: formData.get('industry'),
      message: formData.get('message'),
    };

    try {
      // APIエンドポイントにデータを送信
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '送信に失敗しました');
      }
      
      setSubmitMessage(result.message || 'お問い合わせありがとうございます。48時間以内にご返信いたします。');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage(error instanceof Error ? error.message : '送信に失敗しました。恐れ入りますが、再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                住宅システム開発
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 cursor-pointer">サービス</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 cursor-pointer">特徴</a>
              <a href="#portfolio" className="text-gray-700 hover:text-blue-600 cursor-pointer">実績</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 cursor-pointer">お問い合わせ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20minimalist%20office%20workspace%20with%20a%20freelance%20developer%20working%20on%20multiple%20monitors%2C%20showing%20clean%20architectural%20blueprints%20and%20code%20on%20screens%2C%20bright%20natural%20lighting%20from%20large%20windows%2C%20contemporary%20furniture%2C%20professional%20yet%20warm%20atmosphere%2C%20representing%20efficiency%20and%20innovation%20in%20residential%20development%20technology&width=1920&height=800&seq=hero-bg-001&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                AI活用で住宅業界の
                <span className="text-blue-600">開発コストを削減</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                最新AI技術と豊富な経験を組み合わせ、従来の開発プロセスを効率化。<br/>
                住宅関連企業様のDXを適正価格で支援いたします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer text-center"
                >
                  無料相談を申し込む
                </a>
                <a 
                  href="#portfolio" 
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer text-center"
                >
                  実績を見る
                </a>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20freelance%20developer%20working%20efficiently%20on%20modern%20laptop%20with%20AI%20assistance%2C%20showing%20residential%20construction%20management%20software%20interface%2C%20clean%20workspace%20with%20architectural%20plans%2C%20representing%20innovation%20and%20cost-effective%20development%20solutions%20for%20housing%20industry&width=600&height=500&seq=hero-main-001&orientation=landscape"
                alt="AI活用開発のイメージ"
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              なぜ低コスト・高クオリティを実現できるのか
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              最新のAI技術と豊富な経験を組み合わせ、従来の開発プロセスを革新
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-robot-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI活用による効率化</h3>
              <p className="text-gray-600 leading-relaxed">
                コード生成、設計支援、テスト自動化などにAIを活用。
                従来の開発工程を大幅に短縮し、品質も向上。
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">一人開発の機動力</h3>
              <p className="text-gray-600 leading-relaxed">
                複数人でのコミュニケーションコストゼロ。
                迅速な意思決定と柔軟な対応で、スピード感のある開発を実現。
              </p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-home-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">住宅業界特化</h3>
              <p className="text-gray-600 leading-relaxed">
                不動産管理、施工管理、顧客管理など住宅業界特有の
                ニーズを深く理解した専門的なソリューション。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">開発実績</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">8年</div>
              <div className="text-blue-100">開発経験</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">納期達成率</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">★4.9</div>
              <div className="text-blue-100">満足度評価</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              提供サービス
            </h2>
            <p className="text-lg text-gray-600">
              住宅業界のDXを支援する幅広いソリューション
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20responsive%20website%20design%20for%20real%20estate%20company%2C%20showing%20property%20listings%20and%20clean%20interface%20on%20multiple%20devices%2C%20professional%20layout%20with%20blue%20and%20white%20color%20scheme%2C%20representing%20high-quality%20web%20development%20for%20housing%20industry&width=400&height=250&seq=service-web-001&orientation=landscape"
                alt="ホームページ制作"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-4">ホームページ制作</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• レスポンシブ対応</li>
                <li>• SEO最適化</li>
                <li>• 物件検索機能</li>
                <li>• お問い合わせフォーム</li>
                <li>• CMS導入</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">30万円〜</div>
                <div className="text-sm text-gray-500 mb-2">従来開発費の約1/3</div>
                <div className="text-xs text-gray-400">
                  ※基本機能込み・月額保守費別途
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <img 
                src="https://readdy.ai/api/search-image?query=Mobile%20application%20interface%20for%20construction%20management%2C%20showing%20project%20timeline%20and%20worker%20scheduling%20on%20smartphone%20screen%2C%20modern%20UI%20design%20with%20clean%20layout%2C%20representing%20efficient%20app%20development%20for%20residential%20construction%20companies&width=400&height=250&seq=service-app-001&orientation=landscape"
                alt="アプリ開発"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-4">アプリ開発</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• 施工管理アプリ</li>
                <li>• 顧客管理アプリ</li>
                <li>• 現場報告アプリ</li>
                <li>• iOS/Android対応</li>
                <li>• リアルタイム同期</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">80万円〜</div>
                <div className="text-sm text-gray-500 mb-2">従来開発費の約1/3</div>
                <div className="text-xs text-gray-400">
                  ※iOS/Android両対応・保守費別途
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <img 
                src="https://readdy.ai/api/search-image?query=Business%20management%20system%20dashboard%20for%20housing%20company%2C%20showing%20analytics%20charts%20and%20project%20management%20interface%20on%20computer%20screen%2C%20professional%20software%20design%20with%20data%20visualization%2C%20representing%20comprehensive%20business%20solutions&width=400&height=250&seq=service-system-001&orientation=landscape"
                alt="業務システム"
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-4">業務システム</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• 顧客管理システム</li>
                <li>• 受注管理システム</li>
                <li>• 在庫管理システム</li>
                <li>• 売上分析ツール</li>
                <li>• クラウド対応</li>
              </ul>
              <div className="border-t pt-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">150万円〜</div>
                <div className="text-sm text-gray-500 mb-2">従来開発費の約1/3</div>
                <div className="text-xs text-gray-400">
                  ※カスタマイズ可・運用サポート込み
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Customers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              対象となるお客様
            </h2>
            <p className="text-lg text-gray-600">
              住宅業界で効率化・DXを検討されている企業様
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-building-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">不動産会社</h3>
              <p className="text-sm text-gray-600">物件管理・顧客対応の効率化</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-hammer-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">建設会社</h3>
              <p className="text-sm text-gray-600">施工管理・進捗管理システム</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-tools-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">リフォーム会社</h3>
              <p className="text-sm text-gray-600">見積もり・顧客管理の自動化</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-organization-chart text-white text-xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">住宅メーカー</h3>
              <p className="text-sm text-gray-600">営業支援・CRM導入</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              セキュリティ・品質保証
            </h2>
            <p className="text-lg text-gray-600">
              企業レベルのセキュリティと品質基準を個人開発でも実現
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">SSL暗号化</h3>
              <p className="text-sm text-gray-600">全ての通信を暗号化し、データを保護</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bug-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">脆弱性対策</h3>
              <p className="text-sm text-gray-600">定期的なセキュリティ診断を実施</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-database-2-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">データバックアップ</h3>
              <p className="text-sm text-gray-600">自動バックアップで万全の備え</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">品質保証</h3>
              <p className="text-sm text-gray-600">徹底したテストと品質管理</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Speed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                高品質 × 短納期を実現
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-award-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">企業レベルの品質</h3>
                    <p className="text-gray-600">大手企業での開発経験とAI支援により、個人開発でも企業レベルの品質を保証</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-time-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">従来の1/2の納期</h3>
                    <p className="text-gray-600">AIによるコード生成と効率的な開発プロセスで、通常の半分の期間で納品</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-shield-check-line text-white text-xl w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">安心のサポート</h3>
                    <p className="text-gray-600">納品後3ヶ月の無料サポート付き。修正・改修にも迅速対応</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20developer%20working%20on%20high-quality%20software%20development%20with%20AI%20assistance%2C%20showing%20code%20quality%20metrics%20and%20fast%20delivery%20timeline%20on%20multiple%20monitors%2C%20modern%20office%20environment%20with%20charts%20showing%20efficiency%20improvements%20and%20reduced%20development%20time&width=600&height=500&seq=quality-speed-001&orientation=landscape"
                alt="高品質・短納期のイメージ"
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Company Profile */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              開発者プロフィール
            </h2>
            <p className="text-lg text-gray-600">
              信頼できる技術力で、お客様のビジネスを支援します
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20software%20developer%20portrait%20in%20modern%20office%20setting%2C%20confident%20and%20approachable%20demeanor%2C%20business%20casual%20attire%2C%20with%20computer%20and%20development%20tools%20in%20background%2C%20representing%20expertise%20in%20AI%20and%20software%20development&width=500&height=600&seq=developer-profile-001&orientation=portrait"
                alt="開発者プロフィール"
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">代表開発者：田中 誠</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">経歴・実績</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 大手IT企業にて8年間システム開発に従事</li>
                    <li>• 住宅業界向けシステム開発実績50件以上</li>
                    <li>• AI・機械学習分野での開発経験3年</li>
                    <li>• フルスタック開発者として幅広い技術に精通</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">保有資格・認定</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 情報処理技術者試験 応用情報技術者</li>
                    <li>• AWS認定ソリューションアーキテクト</li>
                    <li>• Google Cloud Professional Cloud Architect</li>
                    <li>• プロジェクトマネージャ試験合格</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">技術スタック</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React/Next.js</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Python</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">AWS</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">AI/ML</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              お客様の声
            </h2>
            <p className="text-lg text-gray-600">
              実際にご利用いただいたお客様からの評価
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">田</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">田村建設 様</h4>
                  <p className="text-sm text-gray-600">代表取締役</p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-4">「従来の開発会社と比べて、コストは1/3、納期は半分でした。AI活用により品質も大幅に向上し、現場の作業効率が20%改善しました。」</p>
              <p className="text-sm text-gray-500">施工管理アプリ開発</p>
            </div>
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">佐</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">佐藤不動産 様</h4>
                  <p className="text-sm text-gray-600">営業部長</p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-4">「ホームページ制作をお願いしました。SEO対策も万全で、問い合わせ数が200%増加。投資効果は想像以上でした。アフターサポートも手厚く安心です。」</p>
              <p className="text-sm text-gray-500">コーポレートサイト制作</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">高</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">高橋ホーム 様</h4>
                  <p className="text-sm text-gray-600">取締役</p>
                </div>
              </div>
              <div className="flex mb-4">
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-700 mb-4">「CRMシステム導入により営業プロセスが劇的に改善。成約率が30%向上し、顧客管理の効率も大幅アップ。一人での開発とは思えない高品質でした。」</p>
              <p className="text-sm text-gray-500">CRMシステム開発</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              実績・成果物サンプル
            </h2>
            <p className="text-lg text-gray-600">
              実際に納品した住宅業界向けシステムの一部をご紹介
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=Real%20estate%20company%20website%20showing%20property%20listings%20with%20advanced%20search%20filters%2C%20modern%20responsive%20design%20with%20clean%20layout%2C%20professional%20photography%20of%20houses%2C%20intuitive%20user%20interface%20for%20property%20browsing%20and%20contact%20forms&width=400&height=250&seq=portfolio-web-001&orientation=landscape"
                alt="不動産会社様ホームページ"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">不動産会社様 公式サイト</h3>
                <p className="text-gray-600 text-sm mb-4">物件検索機能付きレスポンシブサイト。SEO対策により検索流入3倍増を実現。</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">納期: 3週間</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">成果: 問い合わせ200%増</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=Construction%20management%20mobile%20app%20interface%20showing%20project%20timeline%2C%20worker%20scheduling%2C%20and%20progress%20tracking%20on%20smartphone%20and%20tablet%20screens%2C%20intuitive%20dashboard%20with%20construction%20site%20photos%20and%20status%20updates&width=400&height=250&seq=portfolio-app-001&orientation=landscape"
                alt="施工管理アプリ"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">建設会社様 施工管理アプリ</h3>
                <p className="text-gray-600 text-sm mb-4">現場の進捗をリアルタイム管理。作業効率20%向上、報告業務時間50%削減。</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">納期: 6週間</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">成果: 効率20%向上</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=Customer%20relationship%20management%20system%20dashboard%20for%20housing%20company%2C%20showing%20client%20data%20management%2C%20sales%20pipeline%2C%20and%20analytics%20charts%20on%20computer%20screen%2C%20professional%20business%20software%20interface%20with%20data%20visualization&width=400&height=250&seq=portfolio-crm-001&orientation=landscape"
                alt="顧客管理システム"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">住宅メーカー様 CRMシステム</h3>
                <p className="text-gray-600 text-sm mb-4">顧客情報の一元管理で営業効率大幅向上。成約率30%アップを実現。</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">納期: 8週間</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">成果: 成約率30%向上</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            まずは無料相談から始めませんか？
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            あなたの会社の課題をヒアリングし、最適なソリューションをご提案します。
            相談は完全無料、押し売りは一切いたしません。
          </p>
          <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
            <form className="space-y-6" id="contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="株式会社○○"
                  />
                </div>
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="example@company.com"
                />
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  業種
                </label>
                <div className="relative">
                  <select 
                    name="industry"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8"
                  >
                    <option value="">選択してください</option>
                    <option value="real-estate">不動産業</option>
                    <option value="construction">建設業</option>
                    <option value="renovation">リフォーム業</option>
                    <option value="housing-maker">住宅メーカー</option>
                    <option value="other">その他</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  ご相談内容 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="どのようなシステムをお求めでしょうか？現在の課題やご要望をお聞かせください。（500文字以内）"
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : '無料相談を申し込む'}
              </button>
              {submitMessage && (
                <div className={`text-sm text-center p-3 rounded-lg ${submitMessage.includes('ありがとう') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}
              <p className="text-sm text-gray-500">
                ※48時間以内にご返信いたします。まずはお気軽にご相談ください。
              </p>
            </form>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-time-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">迅速対応</h3>
              <p className="text-blue-100 text-sm">48時間以内に必ずご返信</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">秘密厳守</h3>
              <p className="text-blue-100 text-sm">情報は厳重に管理します</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-hand-heart-line text-blue-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">押し売りなし</h3>
              <p className="text-blue-100 text-sm">お客様に最適な提案のみ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <span className="text-2xl font-bold text-blue-400">
                住宅システム開発
              </span>
              <p className="mt-4 text-gray-300 leading-relaxed">
                AI技術を活用して住宅業界のDXを支援する専門サービス。
                適正価格・高品質で、お客様の事業成長をサポートします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">サービス</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#services" className="hover:text-white transition-colors cursor-pointer">ホームページ制作</a></li>
                <li><a href="#services" className="hover:text-white transition-colors cursor-pointer">アプリ開発</a></li>
                <li><a href="#services" className="hover:text-white transition-colors cursor-pointer">業務システム</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
              <ul className="space-y-2 text-gray-300">
                <li>メール: contact@aihousedev.com</li>
                <li>営業時間: 平日 9:00-18:00</li>
                <li>対応エリア: 全国対応</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AI House Dev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
