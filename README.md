![Message Board Application](https://github.com/MySprtlty/Message-Board-Application/assets/89295517/e6cd022d-5a99-47ec-b281-4721e45f51bc)
# Message Board Application
## 1. 개요
- 이 프로젝트는 게시글, 좋아요, 팔로우, 댓글 기능이 있는 게시판 프로젝트입니다.
## 2. 프로젝트 적용 규칙
- REST기반으로 API를 설계하였습니다
- REST API설계 기본 규칙을 따라 개발하였습니다
- [REST API 설계 참고 사이트](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)

# 설계
## 1. DB 설계
![Final-Project ERD](https://github.com/MySprtlty/Message-Board-Application/assets/89295517/3178c0b5-0759-43e9-9e30-6568b9f35c29)

## 2. API 설계
### 1) User 라우터

#### 1-1) 내 정보 요청 API
- Request: GET
- Path: `/user`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id|String|필수|내 아이디|

- Response Format: JSON

|Element|값 구분|설명|
|:---|:---|:---|
|result|sucess/fail|내 정보 조회 성공/실패 여부|
|message|문자열|내 정보 조회 성공/실패 이유|
|data|데이터|내 정보 데이터|

#### 1-2) 내 정보 수정 API
- Request: PATCH
- Path: `/user`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id| String| 필수 |회원 ID|
|name |String |필수| 회원 이름|
|password |String |필수 |회원 비밀번호|
|phone| String |필수 |회원 핸드폰번호|
|address| String |필수X| 회원 주소|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 내 정보 수정 성공/실패 여부|
|message |1 |문자열 |내 정보 수정 성공/실패 이유|

#### 1-3) 지정 사용자 정보 조회 API
- Request: GET
- Path: `/user/:user-id`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|user_id |String |필수 |정보 조회하고싶은 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 지정한 사용자 정보 조회 성공/실패 여부|
|message |1 |문자열| 지정한 사용자 정보 조회 성공/실패 이유|
|data| |데이터 |지정한 사용자 정보 데이터|

#### 1-4) 지정 사용자 작성 댓글 조회 API
- Request: GET
- Path: `/user/:user-id/comments`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|user_id |String |필수 |작성한 댓글 조회를 원하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 지정한 사용자가 작성한 댓글 조회 성공/실패 여부|
|message| 1| 문자열| 지정한 사용자가 작성한 댓글 조회 성공/실패 이유|
|data| |데이터 |지정한 사용자가 작성한 댓글 데이터|

#### 1-5) 지정 사용자 작성 게시글 조회 API
- Request: GET
- Path: `/user/:user-id/postings`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|user_id |String |필수 |작성한 게시글 조회를 원하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |지정한 사용자가 작성한 게시글 조회 성공/실패 여부|
|message |1 |문자열| 지정한 사용자가 작성한 게시글 조회 성공/실패 이유|
|data| |데이터| 지정한 사용자가 작성한 게시글 데이터|

### 2) Auth 라우터
#### 2-1) 회원가입 HTML 요청 API
- Request: GET
- Path: `/auth/join`
- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result| 1 |sucess/fail |회원 가입 HTML 요청 성공/실패 여부|
|message |1 |문자열 |회원 가입 HTML 요청 성공/실패 이유|
|data| |데이터|회원 가입 HTML 데이터|

#### 2-2) 회원가입 요청 API
- Request: POST
- Path: `/auth/join`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String |필수 |회원가입하고자하는 사용자 ID|
|name |String| 필수 |회원가입하고자하는 사용자 이름|
|password| String |필수 |회원가입하고자하는 사용자 비밀번호|
|phone |String |필수 |회원가입하고자하는 사용자 핸드폰번호|
|address |String |필수X| 회원가입하고자하는 사용자 주소|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |회원 가입 요청 성공/실패 여부|
|message|1 |문자열 |회원 가입 요청 성공/실패 이유|

#### 2-3) 로그인 HTML 요청 API
- Request: GET
- Path: `/auth/login`

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 로그인 HTML 요청 성공/실패 여부|
|message| 1| 문자열| 로그인 HTML 요청 성공/실패 이유|
|data| |데이터| 로그인 |

#### 2-4) 로그인 요청 API
- Request: POST
- Path: `/auth/login`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String 필수 |로그인하고자하는 회원 ID|
|password |String 필수 |로그인하고자하는 회원 비밀번호|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |로그인 요청 성공/실패 여부|
|message| 1 |문자열 |로그인 요청 성공/실패 이유|

#### 2-5) 로그아웃 요청 API
- Request: GET
- Path: `/auth/logout`

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |로그아웃 요청 성공/실패 여부|
|message| 1 |문자열 |로그아웃 요청 성공/실패 이유|

### 3) Board 라우터
#### 3-1) 모든 게시글 조회 API
- Request: GET
- Path: `/board`

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1| sucess/fail |모든 게시글 조회 성공/실패 여부|
|message |1 |문자열| 모든 게시글 조회 성공/실패 이유|
|data| |데이터| 모든 게시글 조회 데이터|

#### 3-2) 게시글 업로드 API
- Request: POST
- Path: `/board`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id| String |필수 |게시글 등록하고자하는 사용자 ID|
|title| String| 필수 |등록하고자하는 게시글 제목|
|content| String| 필수 |등록하고자하는 게시글 내용|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |게시글 업로드 성공/실패 여부|
|message |1 |문자열 |게시글 업로드 성공/실패 이유|

#### 3-3) 특정 사용자가 작성한 모든 게시글 조회 API
- Request: GET
- Path: `/board/:user-id`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|user_id |String| 필수| 작성한 모든 게시글을 조회하고자 하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1| sucess/fail| 특정 사용자가 작성한 모든 게시글 조회 성공/실패 여부|
|message |1| 문자열| 특정 사용자가 작성한 모든 게시글 조회 성공/실패 이유|
|data| |데이터| 특정 사용자가 작성한 모든 게시글 조회 데이터|

#### 3-4) 내 게시글 수정 API
- Request: POST
- Path: `/board/:posting-id/edit`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|posting_id| String| 필수| 수정하고자하는 내 게시글 ID|
|id| String| 필수| 수정하고자하는 내 게시글 작성자 ID|
|title| String| 필수| 수정하고자하는 게시글 제목|
|content| String| 필수| 수정하고자하는 게시글 내용|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result| 1 |sucess/fail |내 게시글 수정 성공/실패 여부|
|message| 1 |문자열 |내 게시글 수정 성공/실패 이유|

#### 3-5) 내 게시글 삭제 API
- Request: GET
- Path: `/board/:posting-id/remove`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|posting_id |String |필수 |삭제하고자하는 게시글 ID|
|id |String |필수 |삭제하고자하는 게시글 작성자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |내 게시글 삭제 성공/실패 여부|
|message |1 |문자열 |내 게시글 삭제 성공/실패 이유|

### 4) Posting 라우터
#### 4-1) 특정 게시글 모든 댓글 조회 API
- Request: GET
- Path: `/posting/:posting-id/comments`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|posting_id |String |필수 |댓글을 조회하고자하는 게시글 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |특정 게시글에 모든 댓글 조회 성공/실패 여부|
|message |1| 문자열| 특정 게시글에 모든 댓글 조회 성공/실패 이유|
|data| |데이터 |특정 게시글에 모든 댓글 조회 데이터|

#### 4-2) 특정 게시글 댓글 등록 API

- Request: POST
- Path: `/posting/:posting-id/comments`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|content |String |필수 |특정 게시글에 등록할 댓글 내용|
|posting_id |String |필수 |댓글을 등록할 게시글 ID|
|id |String |필수 |댓글을 등록할 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 특정 게시글에 댓글 등록 성공/실패 여부|
|message |1 |문자열| 특정 게시글에 댓글 등록 성공/실패 이유|

#### 4-3) 특정 게시글 댓글 삭제 API
- Request: DELETE
- Path: `/posting/:posting-id/comments/:comment-id`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|comment_id |String |필수 |삭제할 댓글 ID|
|posting_id |String |필수 |삭제할 댓글이 있는 게시글 ID|
|id |String |필수 |삭제할 댓글을 작성한 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail| 특정 게시글에 댓글 삭제 성공/실패 여부|
|message| 1 |문자열| 특정 게시글에 댓글 삭제 성공/실패 이유|

#### 4-4) 특정 게시글 댓글 수정 API

- Request: PUT
- Path: `/posting/:posting-id/comments/:comment-id`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|content |String |필수 |수정할 댓글 내용|
|comment_id |String |필수 |수정할 댓글 ID|
|posting_id |String |필수 |수정할 댓글을 가지고있는 게시글 ID|
|id |String |필수 |수정할 댓글을 등록한 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |특정 게시글에 댓글 수정 성공/실패 여부|
|message |1 |문자열 |특정 게시글에 댓글 수정 성공/실패 이유|

### 5) Follow 라우터
#### 5-1) 특정 사용자 팔로우한 사용자 조회 API
- Request: GET
- Path: `/follow/:user-id`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|user_id |String |필수 |팔로우한 사용자를 조회하고자하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1| sucess/fail| 특정 사용자 팔로우한 사용자 조회 성공/실패 여부|
|message |1| 문자열| 특정 사용자 팔로우한 사용자 조회 성공/실패 이유|
|data| |데이터| 특정 사용자 팔로우한 사용자 조회 데이터|

#### 5-2) 특정 사용자 팔로우 요청 API

- Request: POST
- Path: `/follow/:user-id/do`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String |필수 |팔로우 하고자하는 사용자 ID|
|user_id |String |필수 |팔로우 당하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |특정 사용자 팔로우 요청 성공/실패 여부|
|message |1 |문자열 |특정 사용자 팔로우 요청 성공/실패 이유|

#### 5-3) 특정 사용자 언팔로우 요청 API
- Request: DELETE
- Path: `/follow/:user-id/undo`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String |필수 |언팔로우 하고자하는 사용자 ID|
|user_id |String |필수 |언팔로우 당하는 사용자 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |특정 사용자 언팔로우 요청 성공/실패 여부|
|message |1 |문자열 |특정 사용자 언팔로우 요청 성공/실패 이유|

### 6) Like 라우터

#### 6-1) 특정 게시글 좋아요 요청 API
- Request: POST
- Path: `/like/:posting-id/do`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String |필수 |게시글에 좋아요를 누를 사용자 ID|
|posting_id |String |필수 |좋아요를 누를 게시글 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1 |sucess/fail |특정 게시글 좋아요 요청 성공/실패 여부|
|message |1 |문자열 |특정 게시글 좋아요 요청 성공/실패 이유|

#### 6-2) 특정 게시글 좋아요 취소 요청 API
- Request: DELETE
- Path: `/like/:posting-id/undo`

|Parameter|타입|필수여부|설명|
|:---|:---|:---|:---|
|id |String |필수 |게시글에 좋아요 취소를 요청할 사용자 ID|
|posting_id |String |필수 |좋아요 취소를 누를 게시글 ID|

- Response Format: JSON

|Element| Depth| 값 구분| 설명|
|:---|:---|:---|:---|
|result |1| sucess/fail |특정 게시글 좋아요 취소 요청 성공/실패 여부|
|message |1| 문자열 |특정 게시글 좋아요 취소 요청 성공/실패 이유|
