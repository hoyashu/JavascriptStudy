 /*-- Breadcrumb --*/
 //함수형 컴포넌트 - function 버전
 function BreadcrumbF({
     $app,
     initialState
 }) { //호이스팅 가능
     console.log("BreadcrumbF실행")

     //class문법 버전처럼 생성시를 특정할수 없기에 실행시, this.render()가 실행하도록 맨 아래 배치
     this.state = initialState
     this.$nav = document.createElement('nav')
     this.$nav.className = "Breadcrumb"

     $app.appendChild(this.$nav)

     // this.render()
     // -> 이거 함수 안에서의 this가 전역객체라서 그런 거, is not fun..오류발생
     //https://velog.io/@minidoo/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C-%EC%8B%9C-%EA%B2%B0%EC%A0%95%EB%90%98%EB%8A%94-this
     //https://www.youtube.com/watch?v=pgo6URFz8tc
     //this는 함수 호출시 결정된다.

     //setState
     this.setState = (newState) => {
         console.log("BreadcrumbF>setState실행", newState)
         this.state = newState
         //setState는 무조건 인스턴스화가 된 다음 실행되기 때문에 render위에 위치해도 됨.
         this.render()
     }

     //랜더링
     this.render = () => {
         console.log("BreadcrumbF>render실행")
         console.log(this.state)
         //state가 비어있는 경우 대비
         if (this.state.length == 0) {
             this.$nav.innerHTML = `<div class="nav-item" data-index="0">root</div>`
         } else {
             this.$nav.innerHTML = `<div class="nav-item" data-index="0">root</div>
            ${this.state.map((node, index) => 
                `<div class="nav-item" data-index="${index}">${node.name}</div>`
            ).join("")}`
         }

     }

     this.render()
 }

 //클래스형 컴포넌트 - class문법 버전
 // 코드 실행 순서가 이렇게 될거에요
 // 1. Class Breadcrumb 를 선언할건데
 // 2. 이 클래스는 constructor와 setState와 render 메소드를 가져요
 // 3. 이상 선언 끝!
 // 4. nodes라는 이름의 인스턴스를 만듭니다.
 // 5. 인스턴스를 만드니 생성자(constructor)가 실행되네요.
 // 6. 생성자에는 render 메서드를 실행하는 구문이 있습니다
 // 7. 아까 선언에 있었네요? Render 해야지~
 class Breadcrumb { //클래스형 - 호이스팅 불가능
     //생성자
     //$app로 추가할 node를 받아온다.
     //constructor, render 메서드들은 컴포넌트의 인스턴스가 생성되어 DOM 상에 삽입될 때에 순서대로 호출됩니다.
     constructor({
         $app,
         initialState
     }) {
         this.state = initialState
         this.$nav = document.createElement('nav')
         this.$nav.className = "Breadcrumb"
         $app.appendChild(this.$nav)

         this.render()
     }

     //프로토타입 메소드
     //update
     setState(newState) {
         this.state = newState

         this.render()
     }

     //프로토타입 메소드
     render() {
         this.$nav.innerHTML = `<div class="nav-item" data-index="0">root</div>
            ${this.state.nodes.map((node, index) => 
                `<div class="nav-item" data-index="${index}">${node.name}</div>`
            ).join("")}`

     }
 }