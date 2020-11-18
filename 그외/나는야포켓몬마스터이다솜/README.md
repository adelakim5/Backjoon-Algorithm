## 나는야 포켓몬 마스터 이다솜(1620)
> 해시를 사용한 집합과 맵 

### 풀이
1. 숫자가 키, 포켓몬 이름이 키인 맵을 두개 만든다. 
   ```
   Map {
  1 => 'Bulbasaur',
  2 => 'Ivysaur',
  3 => 'Venusaur',
  4 => 'Charmander',
  5 => 'Charmeleon',
  6 => 'Charizard',
  7 => 'Squirtle',
  8 => 'Wartortle',
  9 => 'Blastoise',
  ...
   }
   ``` 
   이렇게 "key"가 숫자인 맵 하나와
   ```
   Map {
  'Bulbasaur' => 1,
  'Ivysaur' => 2,
  'Venusaur' => 3,
  'Charmander' => 4,
  'Charmeleon' => 5,
  'Charizard' => 6,
  'Squirtle' => 7,
  'Wartortle' => 8,
  ...
   }
   ```
   이렇게 "key"가 포켓몬 이름인 맵을 하나 만든다. 

2. 주어진 포켓몬의 질문에 따라 다른 맵에서 답을 출력한다. 
   - 포켓몬 이름을 물어보면? 포켓몬 이름이 키인 맵에서 value를 출력한다. 
   - 포켓몬 번호를 물어보면? 숫자가 키인 맵에서 value를 출력한다. 
   - ※ 나는 주어진 포켓몬이 숫자인지 문자열인지 확인하기 위해 `charCodeAt`을 사용하였다.  