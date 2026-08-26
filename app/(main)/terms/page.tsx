export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">이용약관</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4">
        <p>본 이용약관은 Fruits Time (이하 "회사")이 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">제1조 (목적)</h2>
        <p>본 약관은 회사가 제공하는 모든 인터넷 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무, 책임 사항과 기타 필요한 사항을 규정합니다.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">제2조 (용어의 정의)</h2>
        <p>1. "서비스"란 구현되는 단말기(PC, 휴대형 단말기 등)와 상관없이 회원이 이용할 수 있는 Fruits Time 관련 모든 서비스를 의미합니다.</p>
        <p>2. "회원"이란 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</p>
        
        <h2 className="text-xl font-semibold mt-8 mb-4">제3조 (약관의 효력 및 변경)</h2>
        <p>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. 회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 안에서 약관을 개정할 수 있습니다.</p>
        
        {/* 임시 콘텐츠 */}
        <p className="text-muted-foreground mt-12 pt-8 border-t border-border">
          ※ 본 약관은 예시(뼈대) 문서이며, 실제 서비스 운영 시 법적 검토를 거친 약관으로 교체되어야 합니다.
        </p>
      </div>
    </div>
  );
}
