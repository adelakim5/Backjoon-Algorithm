## N-Queen(9663)

> 백트래킹

### 풀이

- n개의 퀸을 놓아야 하니까 **각 행에 하나의 퀸**이 배치되어야 한다.
- 퀸은 **상, 하, 좌, 우, 대각선** 공격이 가능하므로, 이를 피해야한다.

위 조건을 염두하며 `백트래킹`으로 풀었다.

1. 퀸이 위치한 열을 체크할 visit 배열을 만든다.
2. 각 행을 돌면서 퀸을 배치한다.
   1. 해당 행의 각 열을 돌면서 퀸을 배치할 수 있는지 확인한다.
      - visit[`해당 열`]이 true인가?
      - 이전에 위치한 행과 열, 현재 배치할 행과 열이 `대각선`으로 이어져있나?
   2. 위 조건에 부합하면 **배치 불가**, 그렇지 않으면 배치시킨다.
      - visit[`해당 열`] = true
      - 현재 행과 열의 정보를 저장
   3. 다음 행으로 이동하여 위 과정을 반복한다.
   4. 모든 행을 돌았으면 count++ 해준다.
3. 세어준 count를 return 한다.

#### 📌주의

- const로 변수 선언했는지 잘 확인하자 ... 형변환 못하잖아 ...
