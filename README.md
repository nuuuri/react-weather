# Vite-Template (with Yarn Berry)

- **React** 프로젝트 템플릿
- Vite + SWC
- ESLint 적용 (`@rushstack/eslint-config`)
- Prettier 적용

## 환경

- node : v20.16.0
- yarn : 4.5.3

## 시작하기

```bash
# 1. 의존성 패키지 일괄 설치
$ yarn install

# 2. vscode 설정
$ yarn dlx @yarnpkg/sdks vscode


# 3. 스크립트 실행
$ yarn dev
```

## 폴더 구조

- 프로젝트에 따라 types 등의 폴더가 추가될 수 있음

```bash
  src
   ├── assets       # Asset 관리 (이미지, 아이콘 등)
   ├── components   # 컴포넌트 관리
   ├── pages        # 페이지 관리
   ├── services     # API 관리
   ├── stores       # 전역 상태 관리
   ├── styles       # 전역 스타일 및 모듈화 스타일 파일 관리
   └── utils        # 공통으로 사용되는 유틸리티 함수 관리
```
