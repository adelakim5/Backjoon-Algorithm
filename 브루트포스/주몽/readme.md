## 주몽(1940)

> 브루트포스, 정렬

### 풀이

1. 수를 오름차순으로 정렬한다.
2. 두 수를 더해보면서 m과 비교한다.
   - num[0] + num[last], num[1] + num[last-1] ... num[index] + num[last - index]이런식으로 짝지어보며 계산한다.
   - 두 수를 합한 값을 `temp`라고 하면
   - `temp > m`일 때
     - m과 같은 순간이 있을 때까지 last--하여 찾는다.
   - `temp < m`일 때
     - 인덱스 0 다음(1, 2, ...)에 있는 수를 더해본다.
   - `temp === m`일 때
     - cnt를 세어준다.
     - 합이 m이 된 두 수의 값을 0으로 바꿔준다. (두 수를 사용했다는 표시)
     - last를 현재 last보다 -1한 값으로 바꾼다.
3. 위 과정을 index가 last보다 작을 동안 반복한다.
