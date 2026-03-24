export const portfolio = {
  profile: {
    name: "미니",
    role: "Frontend Developer",
    intro:
      "React와 Next.js 기반으로 사용자 중심의 인터페이스를 구현하는 프론트엔드 개발자입니다.",
  },

  projects: [
    {
      name: "Street Food Finder",
      description: "위치 기반 맛집 탐색 서비스입니다.",
      tech: ["React", "Firebase", "Figma"],
      role: "기획 총괄, UI/UX 설계, 프론트엔드 개발",
      github: "https://github.com/your-github-id/street-food-finder",
      demo: "https://your-demo-link.com",
      highlights: [
        "위치 기반으로 주변 맛집을 빠르게 탐색할 수 있는 서비스를 구현했습니다.",
        "사용자 리뷰 기반 탐색 경험을 고려한 UI/UX를 설계했습니다.",
      ],
    },
    {
      name: "AI 옷장",
      description: "의류 등록, 분류, 코디 추천을 제공하는 AI 기반 옷장 서비스입니다.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI"],
      role: "서비스 기획, 프론트엔드 설계",
      github: "https://github.com/your-github-id/ai-closet",
      demo: "https://your-demo-link.com",
      highlights: [
        "의류 등록 및 분류 중심의 직관적인 옷장 UX를 설계했습니다.",
        "날씨와 상황에 맞춘 코디 추천 기능을 기획했습니다.",
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
        "서버 저장 용량 정책 UI 및 TB/GB 단위 validation 기능 구현",
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
            "관리자 통계 / 유저 관리 페이지에서 검색 필터 체크박스 상태 관리 로직이 복잡해 전체 선택과 개별 선택 상태가 일관되지 않는 문제가 있었습니다.",
          actions: [
            "검색 필터 체크박스 상태 관리 로직 개선",
            "`all` 선택과 개별 선택 간 상태 동기화 로직 구현",
            "객체 기반 상태 관리 구조로 리팩토링",
          ],
          outcome:
            "필터 상태 관리 로직을 단순화해 유지보수성을 개선했고, 복잡한 UI 상태를 구조적으로 관리하는 방법을 학습했습니다.",
        },
        {
          title: "관리자 삭제 정책 관리 페이지 개발",
          problem:
            "데이터 삭제 정책을 관리자가 직접 설정할 수 있는 UI가 없어 정책 변경 시 개발자 의존도가 높은 구조였습니다.",
          actions: [
            "관리자 설정 페이지에 삭제 정책 관리 기능 신규 개발",
            "채팅 / DocsBot / 공유 채팅 삭제 보존 기간 설정 모달 구현",
            "숫자 입력 validation 로직 구현",
            "API 연동을 통한 설정 저장 기능 개발",
          ],
          outcome:
            "관리자 UI에서 데이터 삭제 정책을 직접 설정할 수 있도록 개선했고, 비즈니스 정책을 UI로 관리하는 방식을 경험했습니다.",
        },
        {
          title: "서버 관리 UI 및 용량 정책 기능 구현",
          problem:
            "서버 저장 용량 정책을 관리자가 직관적으로 확인하거나 설정할 수 있는 UI가 부족했습니다.",
          actions: [
            "관리자 서버 관리 페이지 저장 용량 설정 UI 개발",
            "서버 용량 정책 안내 Tooltip UI 구현",
            "TB / GB 단위 입력 validation 로직 구현",
          ],
          outcome:
            "관리자 화면에서 서버 용량 정책을 직관적으로 관리할 수 있게 되었고, 사용자 입력 검증과 정책 안내 UI의 중요성을 경험했습니다.",
        },
        {
          title: "LLM 모델 관리 기능 확장",
          problem:
            "기존 시스템은 ChatGPT 모델만 지원해 다른 LLM 모델을 사용할 수 없는 구조였습니다.",
          actions: [
            "Gemini 모델 추가",
            "모델 선택 드롭다운 옵션 확장",
            "다국어 설정 JSON 업데이트",
          ],
          outcome:
            "LLM 모델 확장을 통해 시스템 유연성을 개선했고, 설정 기반 기능 확장 구조를 경험했습니다.",
        },
        {
          title: "DocsBot 권한 기반 UI 제어",
          problem:
            "사용자 권한에 관계없이 일부 기능 UI가 노출되어 관리 화면 사용성이 떨어지는 문제가 있었습니다.",
          actions: [
            "사용자 권한에 따른 UI 노출 제어 로직 구현",
            "Widget 생성 버튼 권한 기반 조건 처리",
          ],
          outcome:
            "권한에 따른 UI 제어로 관리자 UX를 개선했고, 서비스에서 권한 기반 접근 제어 로직을 구현하는 경험을 쌓았습니다.",
        },
        {
          title: "외부 스토리지 연동 UX 개선",
          problem:
            "외부 스토리지(OAuth) 로그인 후 연결 상태가 유지되지 않아 사용자 경험이 좋지 않았습니다.",
          actions: [
            "Google Drive / Dropbox / Box OAuth 연동 UX 개선",
            "로그인 이후 스토리지 연결 상태 자동 복원 로직 구현",
          ],
          outcome:
            "외부 서비스 연동 시 상태 관리의 중요성을 경험했고, OAuth 기반 서비스 연동 UX를 개선했습니다.",
        },
        {
          title: "추천 질문 시스템 개선",
          problem:
            "파일 업로드 유형과 관계없이 동일한 추천 질문이 제공되어 사용자 경험이 제한적이었습니다.",
          actions: [
            "추천 질문 카드 컴포넌트 개선",
            "템플릿 변수 치환 기능을 활용한 동적 질문 생성 로직 구현",
          ],
          outcome:
            "업로드 유형에 따른 맞춤형 질문을 제공할 수 있게 되었고, UI 컴포넌트와 데이터 로직을 결합한 기능 구현을 경험했습니다.",
        },
        {
          title: "DocsBot 보안 및 접근 제어 개선",
          problem:
            "Cloudoc Agent 접근 제한 메시지가 정적 처리되어 사용자 상황에 맞는 안내가 어려웠습니다.",
          actions: [
            "사용자 ID 기반 접근 제한 메시지 처리 로직 개선",
            "접근 제한 메시지 동적 처리 로직 구현",
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
        "철도 고장 분석 솔루션 프로젝트에서 관리자 대시보드와 서비스 랜딩페이지를 기획하고 개발했습니다. 프로젝트를 직접 담당하며 기획 → UI/UX 설계 → 프론트엔드 개발 → 검수 및 발표까지 전체 개발 프로세스를 경험했습니다.",
      collaboration:
        "업무를 직접 할당받은 뒤 기획 → UI/UX 설계 → 프론트엔드 개발 → 검수 및 발표의 전 과정을 담당하며 프로젝트를 진행했습니다.",
      highlights: [
        "철도 솔루션 사용자 분석 관리자 페이지 기획 및 개발",
        "FRACAS 랜딩페이지 기획 및 개발",
        "기획부터 UI/UX 설계, 프론트엔드 구현, 검수 및 발표까지 전체 프로세스 주도",
        "관리자 워크플로우와 CTA 중심 UX 흐름 설계 경험",
      ],
      details: [
        {
          title: "철도 솔루션 사용자 분석 관리자 페이지",
          problem:
            "기존 내부 관리 화면은 데이터가 여러 페이지에 흩어져 있어 주요 통계를 한눈에 파악하기 어려웠고, 필요한 정보에 도달하기까지 4~6번 이상의 클릭이 필요했습니다. 또한 컴포넌트 재사용이 고려되지 않아 페이지 간 UI 구조가 달라 유지보수 비용이 높은 상태였습니다.",
          actions: [
            "데이터 흐름을 요약 → 상세 → 분석 구조로 재설계",
            "반복되는 UI를 공통 컴포넌트로 분리",
            "관리자 워크플로우 기준으로 클릭 동선 최소화",
            "React 기반 컴포넌트 구조로 대시보드 구현",
            "로그인 이후 접근 가능한 관리자 인증 로직 구현",
          ],
          outcome:
            "주요 통계 확인 클릭 수를 4~6회에서 1~2회로 줄였고, 공통 컴포넌트 도입으로 코드 중복을 약 40% 줄였습니다. 관리자 피드백으로도 정보가 정리돼 있어 찾기 편하다는 반응을 얻었습니다.",
        },
        {
          title: "FRACAS 랜딩페이지 개발",
          problem:
            "철도 고장 분석 솔루션은 기능이 많고 설명이 복잡해 처음 방문한 사용자가 핵심 가치를 빠르게 이해하기 어려웠고, 컨설팅 신청으로 이어지는 전환 흐름(CTA)도 약한 구조였습니다.",
          actions: [
            "문제 제기 → 솔루션 설명 → CTA 전환 구조로 랜딩페이지 스토리 재설계",
            "핵심 정보를 첫 화면(Above the Fold)에 배치",
            "GIF 및 시각적 요소를 활용해 사용자 시선 유도",
            "기술 용어를 일반 사용자도 이해할 수 있도록 문구 단순화",
            "향후 확장을 고려해 컴포넌트 기반 UI 구조로 개발",
          ],
          outcome:
            "서비스 핵심 메시지와 CTA를 첫 화면에서 즉시 확인할 수 있도록 개선했고, 복잡한 기술 솔루션 내용을 단일 페이지에서 직관적으로 전달할 수 있게 했습니다. 완성된 랜딩페이지는 부산국제철도기술산업전 공식 홍보 페이지로 채택되었습니다.",
        },
      ],
      learnings: [
        "복잡한 데이터를 구조적으로 시각화하는 방법",
        "UI 컴포넌트 재사용을 통한 유지보수성 설계",
        "관리자 사용자 기준의 워크플로우 기반 UX 설계",
        "기술 중심 서비스를 사용자 중심 메시지로 재구성하는 UX 설계 경험",
        "랜딩페이지에서 전환(CTA) 중심 구조 설계의 중요성 이해",
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
      tech: ["JavaScript", "React", "MongoDB", "Mui", "Styled-components", "Git"],
    },
  ],
};
