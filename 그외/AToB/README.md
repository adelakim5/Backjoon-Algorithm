## A → B (16953)
> 그래프 이론 

### 풀이 
1. B에서 부터 2를 나누거나 뒤에 있는 1을 빼면서 A를 만들 수 있는지 살핀다.
   - B가 짝수라면 2를 나눈다. 
   - B가 짝수가 아니라면
     - B의 맨 마지막 숫자가 1이라면 1을 뺀다. 
     - 그렇지 않다면 이는 만들 수 없는 숫자이므로 -1를 출력한다. 
   - 계산을 수행할 때마다 개수를 세어준다.
2. 만약 B가 A보다 더 작아지게 되면 이는 또한 만들 수 없는 숫자이므로 -1를 출력한다. 
3. B가 A가 되면 세어준 개수를 출력한다. 