//공부 출처 : https://prgms.tistory.com/53

//Nodes 컴포넌트 - function문법 버전
//생성된 dom을 어디에 append할지를 $app 파라메더로 받기
//파라메터는 구조 분해 할당 방식으로 처리
function Nodes1({ $app, initialState }) {
    
    this.state = initialState

    //Nodes컴포넌트를 렌더링 할 dom을 this.$target이라는 이름으로 생성
    this.$target = document.createElement('ul')
    $app.appendChild(this.$target)

    //state를 받아서 현재 컴포넌트의 state를 변경하고 다시 렌더링하는 함수
    this.setState = (nextState) => {
        this.state = nextState
        //render함수 내에서 this.state기준으로 렌더링을 하기 때문에, 
        //단순히 이렇게만 해주어도 상태가 변경되면 화면이 알아서 바뀜
        this.render()
    }

    //파라메터가 없는 Nodes의 render함수.
    //현재 상태(this.state) 기준으로 렌더링 합니다.
    this.render = () => {
        this.$target.innerHTML = this.state.nodes.map(node => 
            `<li>${node.name}</li>`
            )
    }

    //인스턴스화 이후 바로 render함수를 실행하여 new로 생성하자마자 렌더링 되도록 할 수 있음
    this.render()
}

//Nodes 컴포넌트 - class문법 버전
class Nodes2{
    //new키워드를 통해 해당 컴포넌트가 생성되는 시점에 실행된다. //생성자 new~시 실행
    constructor({ $app, initialState }){
        this.state = initialState
            this.$target = document.createElement('ul')
        $app.appendChild(this.$target)

        this.render() //ul>li node 생성
    }

    setState(nextState){
        this.state = nextState
        this.render()
    }

    //자신의 상태(state)를 기준으로 렌더링해야하기 떄문에 별도의 파라메터를 받지 않아야한다.
    render(){
        this.$target.innerHTML = this.state.nodes.map(node => 
            `<li>${node.name}</li>`
            )
    }
}

//-> 이런 식으로 작성하면 실제 dom을 직접 제어하는 부분을 컴포넌트가 인스턴스화 되는 시점, 그리고 render함수가 다시 호출되는 시점으로 제한할 수 있다.

//이렇게 만들어진 컴포넌트는 아래와 같이 사용할 수 있다.

const $app = document.querySelector('.app')
const initialState = {
    nodes: []
}
const nodes = new Nodes2({ $app, initialState })

//이후 nodes를 갱신할 일이 있다면, nodes.setState를 호출
const nextState = {
    nodes : [
        {
            //...
        }
    ]
}
nodes.setState(nextState)