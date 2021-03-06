## 경쟁적 전염 (18405)
> 구현

### 풀이 
1. bfs로 접근한다. 

    이를 위해, 먼저 큐를 만들어주는데 **애초부터 바이러스를 넣은** 큐로 시작한다. 

      1. 바이러스가 있는 곳을 큐에 넣는다. 
      2. 바이러스 숫자가 작은것부터 오름차순으로 큐를 정렬한다. 
      3. 큐에 넣은 바이러스의 위치를 방문체크해준다.
   
    위 과정을 통해 큐에 바이러스들을 넣고, 본격적으로 bfs를 진행한다. 

    1. 큐에서 원소를 하나 꺼낸다. 
    2. 꺼낸 원소를 기준으로 상, 하, 좌, 우를 탐색한다. 
    3. 만약 상, 하, 좌, 우가 **바이러스가 없고**, **방문한 적이 없는 곳이면** 해당 부분을 현재 원소의 바이러스로 전염시킨다. 
    4. 시간을 추가해준다. 
   
    전염은 s시간 까지만 시켜야 한다. 따라서 현재 시간이 s라면, 더이상 전염시킬 필요가 없다. bfs를 멈춘다.

2. bfs로 구한 x행 y열의 값을 구한다. 

[[코딩테스트] 백준 - 경쟁적 전염 (18405)](https://blog.naver.com/diddnjs02/222134680900)