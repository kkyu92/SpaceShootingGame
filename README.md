# SpaceShootingGame
* * *
<p align="center">
    <img src="https://raw.githubusercontent.com/kkyu92/SpaceShootingGame/master/multiGame/public/img/phaser_background.png" alt="liveAuction logo" width="400" height="300"></p>
<div style="text-align: center">2:2 팀 대전 우주선 게임입니다.</div>

Phaser3 게임 엔진을 이용해 게임을 구현했습니다.  
Node.js를 이용해 서버를 구축했습니다.  
Socket.io를 사용해 통신했습니다.

- - -
## 목차

- [사용기술](#사용기술)
- [핵심기능](#핵심기능)
- [참고사항](#참고사항)

- - -
## 사용기술

#### 언어
- Php
- JavaScript

#### 운영체제
- Linux(ubuntu)

#### 서버
- Apache

#### 데이터베이스
- MySQL

- - -
## 핵심기능

### [홈페이지 기능]  
<img src="https://raw.githubusercontent.com/kkyu92/SpaceShootingGame/master/multiGame/public/img/homePage.png"></img>
#### 1. 회원가입, 로그인 

- 회원 가입 양식  
- 로그인 세션 사용하여, 사용자 접속이 유지   
- 로그인을 해야 게임하기, 전적확인 가능

#### 2. 전적확인 

- 사용자의 최근5 게임 기록 불러옴
- 더보기 버튼을 이용해 5게임 단위로 기록을 보여줌

#### 3. 랭킹

- 사용자들의 게임 기록을 비교
- 게임포인트, 아이템획득, 정확도 순위를 나타냄

### [게임 기능]  
<img src="https://raw.githubusercontent.com/kkyu92/SpaceShootingGame/master/multiGame/public/img/game.png"></img>
#### 1. 게임설명 

-  2:2 팀 대전 우주선 게임
- 게임시간 30초 동안 더 많은 점수를 획득한 팀이 승리
- 기본 10발의 총알을 지급, 사용할 때 마다 감소
- 별, 총알 아이템으로 점수를 획득할 수 있음
- 총알 아이템은 획득한 플레이어에게 총알 지급
- 총알에 맞은 팀의 점수는 감소함

#### 2. 팀 선택 

- 레드팀과 블루팀을 선택할 수 있음
- 각 팀별 몇 명의 플레이어가 선택했는지 숫자로 표시
- 두명의 플레이어가 선택한 팀은 선택할 수 없음
- 네명의 플레이어 팀선택이 끝나야 게임이 시작됨

#### 3. 게임종료

- 팀별 점수와 승리, 무승부, 패배 표시
- 개인별 게임기록 표시
- 확인버튼으로 게임 다시 시작 (초기화)

- - -
## 참고사항

개인프로젝트로 진행하였습니다.  
6주동안 만들었습니다.

### [전체 영상] 
- https://youtu.be/NgTpPc5RPzc

### [참고 예제] 
- https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/
