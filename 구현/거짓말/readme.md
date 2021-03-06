## 거짓말(1043)

> 구현
> 그래프 탐색

### 풀이

먼저, 진실을 아는 사람 + 아는 사람과 동석한 사람들을 모두 구한다.

그 다음, 각 파티를 확인하며 위에 해당하는 사람이 없을 때에만 카운트를 세어준다.

1. 파티에 함께 있는 사람들을 연결시킬 2차원 배열을 만든다.

- 내 코드에서는 `g`
- 파티에 같이 가는 사람들을 체크하기 위한 배열이다.
- 만약 `4 1 2 3 4`라면
  - 0: 함께가지 않음, 1: 함께 감
  - g 배열은 모두 0으로 초기화 시킨 후 진행한다.
  ```
  index  |   0   1   2   3   4
  -------------------------------
  0      |   0   0   0   0   0
  1      |   0   0   1   1   1    <= 1은 2, 3, 4와 같이 가기 때문
  2      |   0   1   0   1   1    <= 2는 1, 3, 4와 같이 가기 때문
  3      |   0   1   1   0   1    <= 3은 1, 2, 4와 같이 가기 때문
  4      |   0   1   1   1   0    <= 4는 1, 2, 3과 같이 가기 때문
  ```

2. 진실을 아는 사람들을 모은다.

- 기존에 진실을 이미 알고 있는 사람들과 함께 한 사람들도 진실을 알게 되므로, 이 사람들도 진실을 아는 사람들(`knowingPeople`)로 분류시킨다.
- dfs로 탐색한다.
  1. 기존에 진실을 이미 알고 있는 사람들을 stack에 넣는다.
  2. stack의 마지막원소(curr)를 뺀 후, `g[curr]`을 확인한다.
     - `g[curr][i]`가 1인 경우 && 해당 지점을 방문하지 않은 경우에만 stack에 넣는다. (이 때, `knowingPeople`로 합류시키고, 방문 체크 해준다.)
  3. stack이 비워질 때까지 반복한다.

3. 각 파티를 돌며 파티에 참가한 사람들을 확인한다.

- 해당 사람들 중 `knowingPeople`에 속한 사람이 없을 때에만 카운트를 세어준다.

4. 카운트를 반환한다.
