# 프로젝트 개요
* 이 프로젝트는 게시글, 좋아요, 팔로우, 댓글 기능이 있는 게시판 프로젝트입니다.

# 프로젝트 적용 규칙
* REST기반으로 API를 설계하였습니다
* REST API설계 기본 규칙을 따라 개발하였습니다
* [REST API 설계 참고 사이트]

# API 설계
## User 라우터
### 내 정보 요청 API
* Request: GET
* Path: /user

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 내 정보 수정 API
* Request: PATCH
* Path: /user

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 지정 사용자 정보 조회 API
* Request: GET
* Path: /user/:user-id

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 지정 사용자 작성댓글 조회 API
* Request: GET
* Path: /user/:user-id/comments

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 지정 사용자 작성게시글 조회 API
* Request: GET
* Path: /user/:user-id/postings

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

## Auth 라우터
### 회원가입 HTML 요청 API
* Request: GET
* Path: /auth/join

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 회원가입 요청 API
* Request: POST
* Path: /auth/join

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 로그인 HTML 요청 API
* Request: GET
* Path: /auth/login

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 로그인 요청 API
* Request: POST
* Path: /auth/login

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 로그아웃 요청 API
* Request: GET
* Path: /auth/logout

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

## Auth 라우터
### 모든 게시글 조회 API
* Request: GET
* Path: /board

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 게시글 업로드 API
* Request: POST
* Path: /board

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 특정 사용자가 작성한 모든 게시글 조회 API
* Request: GET
* Path: /board/:user-id

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 내 게시글 수정 API
* Request: POST
* Path: /board/:posting-id/edit

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 내 게시글 삭제 API
* Request: GET
* Path: /board/:posting-id/remove

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

## Posting 라우터
### 특정 게시글 모든 댓글 조회 API
* Request: GET
* Path: /posting/:posting-id/comments

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 특정 게시글 댓글 등록 API
* Request: POST
* Path: /posting/:posting-id/comments

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 특정 게시글 댓글 삭제 API
* Request: DELETE
* Path: /posting/:posting-id/comments/:comment-id

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 특정 게시글 댓글 수정 API
* Request: PUT
* Path: /posting/:posting-id/comments/:comment-id

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

## Follow 라우터
### 특정 사용자 팔로우한 사용자 조회 API
* Request: GET
* Path: /follow/:user-id

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 특정 사용자 팔로우 요청 API
* Request: POST
* Path: /follow/:user-id/do

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

### 특정 사용자 언팔로우 요청 API
* Request: DELETE
* Path: /follow/:user-id/undo

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

## Like 라우터
### 특정 게시글 좋아요 요청 API
* Request: POST
* Path: /like/:posting-id/do

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

* Response Format: JSON

|Element|Depth|값 구분|설명|
|------|---|---|---|
|result|1|success/fail|회원 가입 성공/실패 여부|
|error|1|에러 문자열|회원 가입 실패 시 실패 이유|

### 특정 게시글 좋아요 취소 요청 API
* Request: DELETE
* Path: /like/:posting-id/undo

|Parameter|타입|필수여부|설명|
|------|---|---|---|
|id|String|필수|회원 ID|
|name|String|필수|회원 이름|
|password|String|필수|회원 비밀번호|

[REST API 설계 참고 사이트]: https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
