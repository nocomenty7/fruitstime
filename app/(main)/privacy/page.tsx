export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">개인정보 처리방침</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
        <p>Fruits Time (이하 "회사")은(는) 이용자의 개인정보 보호를 매우 중요시하며, 「개인정보 보호법」 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">1. 수집하는 개인정보의 항목 및 수집 방법</h2>
        <p>회사는 소셜 로그인 및 서비스 제공을 위해 아래와 같은 최소한의 개인정보를 수집하고 있습니다.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>수집 항목:</strong> 소셜 로그인 제공자 식별자(ID), 이메일 주소, 프로필 이미지</li>
          <li><strong>수집 방법:</strong> 소셜 로그인(Google, Naver 등) 연동 시 자동 수집</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>서비스 제공에 관한 계약 이행 및 콘텐츠 제공</li>
          <li>회원 관리 (본인확인, 개인 식별, 불량회원의 부정 이용 방지와 비인가 사용 방지)</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
        <p>원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 동안 회원정보를 보관합니다.</p>

        {/* 임시 콘텐츠 */}
        <p className="text-muted-foreground mt-12 pt-8 border-t border-border">
          ※ 본 방침은 예시(뼈대) 문서이며, 실제 서비스 운영 시 수집 항목에 맞게 개정되어야 합니다.
        </p>
      </div>
    </div>
  );
}
