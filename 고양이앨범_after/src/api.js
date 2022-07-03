 //api end point를 상수처리 해두면 나중에 변경 되었을 경우 처리하기 쉬움
 const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

 //체인잉 
 /*-- get Data api --*/
 const requestB = (nodeId) => { //함수 표현식
     //fetch() 로 부터 기본적으로 Promise객체를 반환
     //return new Promise((resolve, reject) => {
     fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
         .then((response) => {
             //fetch()로 부터 반환되는 Promise객체는 HTTP error상태를 reject하지 않기에 따로 처리
             if (!response.ok) {
                 throw new Error('http오류')
             }
             //직접 json응답 본문을 받을 수는 없다.
             //response는 http응답 전체를 나타내는 객체로, json본문 콘텐츠를 추출하기 위해서는 json()메서드를 호출해야 한다.
             //json()응답 본문 텍스트를 json으로 파싱한 결과로 이행하는,또 다른 프로미스를 반환한다.
             console.log(response.json);
             return response.json();
         })
         .then((data) => {
             console.log('성공:', data);
             return data
             //resolve(data);
         })
         .catch((e) => {
             console.error('실패:', e.message);
         });
     //})
 }
 /*-- //get Data api --*/


 //체인잉 지우기
 /*-- get Data api --*/
 const request = async (nodeId) => { //함수 표현식
     console.log("request실행")
     //fetch() 로 부터 기본적으로 Promise객체를 반환
     //fetch 작동 이후 아래 구문 실행
     const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`)
     try {
         if (!res.ok) {
             throw new Error('http오류')
         }

         //res.json()완료 후 return
         return await res.json()

     } catch (e) {
         console.error('실패:', e.message);
     }
     //})
 }
 /*-- //get Data api --*/