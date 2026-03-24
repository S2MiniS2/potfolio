export const portfolio = {
  profile: {
    name: "박민희",
    role: "Frontend Developer",
    intro:
      "React와 Next.js 기반으로 사용자 중심 인터페이스를 설계하고 구현하는 프론트엔드 개발자입니다.",
  },

  projects: [
    {
      name: "로컬톡 (LocalTalk)",
      description:
        "위치 기반으로 주변 오프라인 행사를 탐색하고 저장할 수 있도록 돕는 모바일 플랫폼입니다.",
      tech: ["React Native", "TypeScript", "Emotion", "Storybook"],
      role: "프론트엔드 개발",
      github: "https://github.com/AYU-Side-Project/AYU-Side-Project_front/tree/develop",
      demo: "",
      highlights: [
        "마이페이지, 북마크, 설정 페이지 UI를 구현했습니다.",
        "Storybook 기반 공용 UI 컴포넌트 구조를 정리했습니다.",
      ],
    },
    {
      name: "잡초년생",
      description:
        "사회 초년생과 강소기업을 연결하는 직무 기반 매칭 플랫폼입니다.",
      tech: ["React", "JavaScript", "Figma", "Chatbase", "OpenAI API"],
      role: "기획 총괄 · UI/UX 디자인 · 프론트엔드 개발",
      github: "https://github.com/AYU-Side-Project/AYU-Side-Project_front/tree/develop",
      demo: "",
      highlights: [
        "회원가입, 인증, 채용 탐색, 마이페이지 UI를 설계하고 구현했습니다.",
        "챗봇 기반 정보 탐색 구조를 서비스 흐름에 녹여냈습니다.",
      ],
    },
  ],

  experience: [
    {
      company: "mcloudoc",
      role: "Frontend Intern",
      period: "2025.12 - 2026.02",
      description:
        "Next.js 기반 DocsBot 및 관리자 시스템에서 관리 기능 개발, UX 개선, 권한 제어 로직 구현 등 서비스 기능 개선 작업을 수행했습니다.",
      summary:
        "Next.js 기반 DocsBot 및 관리자 시스템에서 관리 기능 개발, UX 개선, 권한 제어 로직 구현 등 서비스 기능 개선 작업을 수행했습니다.",
      collaboration:
        "Jira를 통해 작업을 할당받고 일정 기간을 설정한 뒤 개발을 진행했으며, 작업 완료 후 Merge Request(MR)를 통해 코드 리뷰 기반으로 협업했습니다.",
      highlights: [
        "관리자 검색 필터 상태 관리 로직 개선 및 all/개별 선택 동기화 구현",
        "관리자 삭제 정책 관리 페이지 및 보존 기간 설정 모달 개발",
        "서버 용량 정책 UI 및 TB/GB 단위 validation 로직 구현",
        "LLM 모델 관리 기능 확장 및 Gemini 모델 추가",
        "DocsBot 권한 기반 UI 제어 및 Widget 생성 버튼 조건 처리",
        "Google Drive / Dropbox / Box OAuth 연동 UX 개선",
        "업로드 유형 기반 추천 질문 동적 생성 로직 구현",
        "사용자 ID 기반 접근 제한 메시지 동적 처리 로직 구현",
      ],
      details: [
        {
          title: "관리자 검색 필터 상태 관리 로직 개선",
          problem:
            "관리자 통계 및 유저 관리 페이지에서 검색 필터 체크박스 상태 관리 로직이 복잡해 전체 선택(all)과 개별 선택 상태가 일관되지 않는 문제가 있었습니다.",
          actions: [
            "검색 필터 체크박스 상태 관리 로직을 개선했습니다.",
            "`all` 선택과 개별 선택 간 상태 동기화 로직을 구현했습니다.",
            "객체 기반 상태 관리 구조로 리팩토링했습니다.",
          ],
          outcome:
            "필터 상태 관리 로직을 단순화해 유지보수성을 높였고, 복잡한 UI 상태를 구조적으로 관리하는 방법을 익혔습니다.",
        },
        {
          title: "관리자 삭제 정책 관리 페이지 개발",
          problem:
            "데이터 삭제 정책을 관리자가 직접 설정할 수 있는 UI가 없어 정책 변경 시 개발자 의존도가 높은 구조였습니다.",
          actions: [
            "관리자 설정 페이지에 삭제 정책 관리 기능을 신규 개발했습니다.",
            "채팅, DocsBot, 공유 채팅 삭제 보존 기간 설정 모달을 구현했습니다.",
            "숫자 입력 validation 로직과 API 연동 저장 기능을 개발했습니다.",
          ],
          outcome:
            "관리자 UI에서 데이터 삭제 정책을 직접 설정할 수 있도록 개선했고, 비즈니스 정책을 UI로 관리하는 방식을 경험했습니다.",
        },
        {
          title: "서버 관리 UI 및 용량 정책 기능 구현",
          problem:
            "서버 저장 용량 정책을 관리자가 직관적으로 확인하거나 설정할 수 있는 UI가 부족했습니다.",
          actions: [
            "관리자 서버 관리 페이지의 저장 용량 설정 UI를 개발했습니다.",
            "서버 용량 정책 안내 Tooltip UI를 구현했습니다.",
            "TB / GB 단위 입력 validation 로직을 구현했습니다.",
          ],
          outcome:
            "관리자 화면에서 서버 용량 정책을 직관적으로 관리할 수 있게 되었고, 입력 검증과 정책 안내 UI의 중요성을 배웠습니다.",
        },
        {
          title: "LLM 모델 관리 기능 확장",
          problem:
            "기존 시스템은 ChatGPT 모델만 지원해 다른 LLM 모델을 사용할 수 없는 구조였습니다.",
          actions: [
            "Gemini 모델을 추가했습니다.",
            "모델 선택 드롭다운 옵션을 확장했습니다.",
            "다국어 설정 JSON을 업데이트했습니다.",
          ],
          outcome:
            "LLM 모델 확장을 통해 시스템 유연성을 높였고, 설정 기반 기능 확장의 구조를 경험했습니다.",
        },
        {
          title: "DocsBot 권한 기반 UI 제어",
          problem:
            "사용자 권한과 관계없이 일부 기능 UI가 노출되어 관리 화면 사용성이 떨어지는 문제가 있었습니다.",
          actions: [
            "사용자 권한에 따른 UI 노출 제어 로직을 구현했습니다.",
            "Widget 생성 버튼에 권한 기반 조건 처리를 적용했습니다.",
          ],
          outcome:
            "권한에 따른 UI 제어로 관리자 UX를 개선했고, 서비스에서 접근 제어 로직을 구현하는 경험을 쌓았습니다.",
        },
        {
          title: "외부 스토리지 연동 UX 개선",
          problem:
            "외부 스토리지(OAuth) 로그인 후 연결 상태가 유지되지 않아 사용자 경험이 좋지 않았습니다.",
          actions: [
            "Google Drive / Dropbox / Box OAuth 연동 UX를 개선했습니다.",
            "로그인 이후 스토리지 연결 상태 자동 복원 로직을 구현했습니다.",
          ],
          outcome:
            "외부 서비스 연동에서 상태 관리의 중요성을 체감했고, OAuth 기반 서비스 연동 UX 개선 경험을 쌓았습니다.",
        },
        {
          title: "추천 질문 시스템 개선",
          problem:
            "파일 업로드 유형과 관계없이 동일한 추천 질문이 제공되어 사용자 경험이 제한적이었습니다.",
          actions: [
            "추천 질문 카드 컴포넌트를 개선했습니다.",
            "템플릿 변수 치환 기능을 활용한 동적 질문 생성 로직을 구현했습니다.",
          ],
          outcome:
            "업로드 유형에 따른 맞춤형 질문 제공이 가능해졌고, UI 컴포넌트와 데이터 로직을 결합한 기능 구현 경험을 얻었습니다.",
        },
        {
          title: "DocsBot 보안 및 접근 제어 개선",
          problem:
            "Cloudoc Agent 접근 제한 메시지가 정적으로 처리되어 사용자 상황에 맞는 안내가 어려웠습니다.",
          actions: [
            "사용자 ID 기반 접근 제한 메시지 처리 로직을 개선했습니다.",
            "접근 제한 메시지 동적 처리 로직을 구현했습니다.",
          ],
          outcome:
            "접근 제어 상황에 맞는 동적 메시지 처리 경험을 쌓았고, 보안 관련 UI 처리 로직을 구현했습니다.",
        },
      ],
      learnings: [
        "실제 서비스 코드베이스에서 기존 구조를 이해한 뒤 기능을 확장하는 개발 경험",
        "관리자 시스템에서 비즈니스 로직을 고려한 UI 설계 경험",
        "Git MR 기반 코드 리뷰를 통한 협업 개발 프로세스 경험",
      ],
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git", "Jira"],
    },
    {
      company: "Bizpeer",
      role: "Fullstack Intern",
      period: "2023.03 - 2023.07",
      description:
        "철도 고장 분석 솔루션 프로젝트에서 관리자 대시보드와 서비스 랜딩페이지를 기획하고 개발했습니다.",
      summary:
        "철도 고장 분석 솔루션 프로젝트에서 관리자 대시보드와 서비스 랜딩페이지를 기획하고 개발했으며, 기획부터 UI/UX 설계, 프론트엔드 개발, 검수 및 발표까지 전체 프로세스를 경험했습니다.",
      collaboration:
        "업무를 직접 할당받은 뒤 기획, UI/UX 설계, 프론트엔드 개발, 검수 및 발표의 전 과정을 담당하며 프로젝트를 진행했습니다.",
      highlights: [
        "철도 솔루션 사용자 분석 관리자 페이지 기획 및 개발",
        "FRACAS 랜딩페이지 기획 및 개발",
        "기획부터 프론트엔드 구현, 검수, 발표까지 전체 프로세스 주도",
        "관리자 워크플로우와 CTA 중심 UX 흐름 설계 경험",
      ],
      details: [
        {
          title: "철도 솔루션 사용자 분석 관리자 페이지",
          problem:
            "기존 내부 관리 화면은 데이터가 여러 페이지에 흩어져 있어 주요 통계를 한눈에 파악하기 어려웠고, 필요한 정보에 도달하기까지 4~6번 이상의 클릭이 필요했습니다. 또한 컴포넌트 재사용이 고려되지 않아 페이지 간 UI 구조가 달라 유지보수 비용이 높은 상태였습니다.",
          actions: [
            "데이터 흐름을 요약 → 상세 → 분석 구조로 재설계했습니다.",
            "반복되는 UI를 공통 컴포넌트로 분리했습니다.",
            "관리자 워크플로우 기준으로 클릭 동선을 최소화했습니다.",
            "React 기반 컴포넌트 구조로 대시보드를 구현했습니다.",
            "로그인 이후 접근 가능한 관리자 인증 로직을 구현했습니다.",
          ],
          outcome:
            "주요 통계 확인 클릭 수를 4~6회에서 1~2회 수준으로 줄였고, 공통 컴포넌트 도입으로 코드 중복도 줄였습니다. 관리자 피드백에서도 정보가 정리돼 있어 찾기 편하다는 반응을 얻었습니다.",
        },
        {
          title: "FRACAS 랜딩페이지 개발",
          problem:
            "철도 고장 분석 솔루션은 기능이 많고 설명이 복잡해 처음 방문한 사용자가 핵심 가치를 빠르게 이해하기 어려웠고, 컨설팅 신청으로 이어지는 CTA 흐름도 약한 구조였습니다.",
          actions: [
            "문제 제기 → 솔루션 설명 → CTA 전환 구조로 랜딩페이지 스토리를 재설계했습니다.",
            "핵심 정보를 첫 화면(Above the Fold)에 배치했습니다.",
            "GIF와 시각적 요소를 활용해 사용자 시선을 유도했습니다.",
            "기술 용어를 일반 사용자도 이해할 수 있도록 문구를 단순화했습니다.",
            "향후 확장을 고려해 컴포넌트 기반 UI 구조로 개발했습니다.",
          ],
          outcome:
            "핵심 메시지와 CTA를 첫 화면에서 바로 확인할 수 있게 했고, 복잡한 솔루션 내용을 단일 페이지에서 직관적으로 전달했습니다. 완성된 랜딩페이지는 부산국제철도기술산업전 공식 홍보 페이지로 채택되었습니다.",
        },
      ],
      learnings: [
        "복잡한 데이터를 구조적으로 시각화하는 방법",
        "UI 컴포넌트 재사용을 통한 유지보수성 설계",
        "관리자 사용자 기준의 워크플로우 기반 UX 설계",
        "기술 중심 서비스를 사용자 중심 메시지로 재구성하는 UX 설계 경험",
        "랜딩페이지에서 CTA 중심 구조 설계의 중요성 이해",
        "기획, UI 설계, 개발을 모두 경험하며 서비스 전달 과정 전체 흐름 이해",
      ],
      github: "https://github.com/S2MiniS2/Internship/tree/ICT",
      galleryGroups: [
        {
          title: "관리자페이지",
          images: [
            "/bizpeer/adminpg.png",
            "/bizpeer/adminpg1.png",
            "/bizpeer/adminpg2.png",
            "/bizpeer/adminpg3.png",
          ],
        },
        {
          title: "랜딩페이지",
          images: [
            "/bizpeer/landingpg.png",
            "/bizpeer/landingpg1.png",
            "/bizpeer/landingpg2.png",
            "/bizpeer/landingpg3.png",
            "/bizpeer/landingpg4.png",
            "/bizpeer/landingpg5.png",
          ],
        },
      ],
      tech: ["JavaScript", "React", "MongoDB", "MUI", "Styled-Components", "Git"],
    },
  ],
};
