## 톱니바퀴(14891)
> 시뮬레이션

### 풀이
1. 톱니바퀴의 규칙을 찾는다. 
   - 입력으로 들어온 톱니바퀴의 값들을 톱니바퀴에 넣어보면 다음과 같다. 
   ![gear](https://blogfiles.pstatic.net/MjAyMDEwMjdfMjUx/MDAxNjAzNzg0Njk2NTE2.cnWUCM3GjmrI1sYCs30z-v9O3BHF_gRNszdmi76yYoEg.UhxtSpNwuwdOZ9ea7e4Jf69PkxlIQ4nqoPa2HtImYHEg.PNG.diddnjs02/image.png)
   - 앞 톱니바퀴의 인덱스 2와 뒤 톱니바퀴의 인덱스 6이 서로 맞물린다는 것을 알 수 있다. 
    ![gear](https://postfiles.pstatic.net/MjAyMDEwMjdfMjk4/MDAxNjAzNzg0NzMyMzU2.QDQMahg7klNsJbArUBmAsDj1KW_lZ6Ke0nY64fYJmXAg.8Jyw0H3P6I_DZOePk9U0uxwbVHNrMCa47TsqYjoovhIg.PNG.diddnjs02/image.png?type=w773)
    - 따라서 앞 톱니바퀴의 인덱스 2의 값과 뒤 톱니바퀴의 인덱스 6의 값을 서로 비교하여 톱니바퀴 회전을 진행해나간다. 

2. 톱니바퀴들의 연좌회전을 주의한다. 
   앞 또는 뒤에 있는 톱니바퀴의 극이 같으면 회전하지 않으니 상관없지만, 극이 서로 다르면 회전하게 된다. 
   ※ 이때, 회전된 톱니바퀴때문에 그 옆에있는 톱니바퀴도 회전되는 것은 아닌지 확인해주어야 한다. 
   ![gear](https://postfiles.pstatic.net/MjAyMDEwMjdfOTEg/MDAxNjAzNzg1MjI4Mjkw.IohqFGLrC9CJ7rDci0fAPd2Zrch262ixHam20FM9Y3Eg.cGFMJRfu8caTeLo800G-gM9_O0BgFdzfbk2hlzX2Ircg.PNG.diddnjs02/image.png?type=w773)

   회전해 줄때는 **반드시 가장 마지막 바깥에 있는 톱니바퀴를 먼저 회전 한 후** 차례로 회전시킨다. 
   - 각 톱니바퀴가 (회전하기 전) "현재상태"에서 서로 극이 같은지/다른지 비교해야 하기 때문이다. 
   - "현재" 서로 극이 다르면 회전하고, 같으면 회전하지 않는다. 

3. 각 톱니바퀴의 12시 방향 값을 확인하여 그에 맞는 점수를 더해 출력한다. 
   
자세한 설명은 .. [[코딩테스트] 백준 - 톱니바퀴(14891)](https://blog.naver.com/diddnjs02/222128121206)

   