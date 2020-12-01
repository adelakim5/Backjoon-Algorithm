## 스티커(9465)
> 다이나믹 프로그래밍

### 풀이 
1. dp 배열을 만든다. 
   - 예를 들어, 스티커 점수가 다음과 같다고 하면
    ![image](https://user-images.githubusercontent.com/49264795/100713204-41deef00-33f7-11eb-88da-37cd8650441b.png)
   - dp 배열은 다음과 같이 만든다.  
    ![image](https://user-images.githubusercontent.com/49264795/100713294-6c30ac80-33f7-11eb-8899-8b982c994858.png)
     - max는 **이전 열**의 최댓값이다. 현재는 1번째 열을 계산하기 때문에 이전 열이 없으므로 max도 0이다. 
     - Value 1은 1번째 행에 위치한 값이다.
     - Value 2는 2번째 행에 위치한 값이다. 
2. 각 열마다 최댓값을 계산한다. 
   - 위에서 만든 dp 배열에 2번째 열을 넣어보자.
    ![image](https://user-images.githubusercontent.com/49264795/100713505-bca80a00-33f7-11eb-9d6f-f497a74826f2.png) 
   - 30은 다음과 같이 계산될 수 있다.  
    ![image](https://user-images.githubusercontent.com/49264795/100713797-304a1700-33f8-11eb-97a2-b2397bfee53d.png)
     - Max + 30
     - 20 + 30
     - 둘중 더 큰 값을 넣는다. 
    - 40도 마찬가지로 Max + 40과 10 + 40 중 더 큰값을 넣는다.   
    ![image](https://user-images.githubusercontent.com/49264795/100714124-b1a1a980-33f8-11eb-9b28-69fdbff08639.png) 
3. Max를 갱신한다. 
   - 10과 20중 더 큰 값을 Max로 둔다. 
   ![image](https://user-images.githubusercontent.com/49264795/100714268-e281de80-33f8-11eb-9cfc-d44467a1c255.png) 
   - 즉, 현재 계산하는 **이전 이전 열의 최댓값**이 Max가 되는 것이다. 
   - 다음 숫자들에 대하여 위 과정을 반복한다. 
4. dp 배열의 n-1번째 열에 해당하는 값들 중 최댓값을 뽑아낸다. 
   - 줄바꿈하여 문자열로 엮은 후 출력한다.   



    