
/*-- Nodes --*/
function Nodes({
    $app,
    initialState,
    onClick
}) { //함수형 - 호이스팅 가능
    console.log("Nodes실행")
    //class문법 버전처럼 생성시를 특정할수 없기에 실행시, this.render()가 실행하도록 맨 아래 배치
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = "Nodes"

    $app.appendChild(this.$target)

    //onclick이 함수인가 보오...?
    this.onClick = onClick

    //setState
    this.setState = (newState) => {
        console.log("Nodes>setState실행")
        this.state = newState
        //setState는 무조건 인스턴스화가 된 다음 실행되기 때문에 render위에 위치해도 됨.
        this.render()
    }

    //랜더링
    this.render = () => {
        console.log("Nodes>render실행")
        console.log(this.state)
        //state가 비어있는 경우 대비
        let nodesTemplate = ''
        if (this.state.nodes.length > 0) {
            //노드 list
            nodesTemplate = this.state.nodes.map((node, index) => {

                const iconPath = node.type === "DIRECTORY" ? "./assets/directory.png" :
                    "./assets/file.png"

                return `<div class="Node" data-node-id="${node.id}"><img src="${iconPath}"><div>${node.name}</div></div>`
            }).join("")
        }
        this.$target.innerHTML = !this.state.isRoot ?
            `<div class="Node"><img src="./assets/prev.png"></div>${nodesTemplate}` : nodesTemplate



        //렌더링된 이후 클릭 가능한 모든 요소에 click이벤트 걸기
        console.log("Nodes>render ~ click이벤트 걸기 실행")
        this.$target.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                //dataset을 통해 클릭한 요소의 date-로 시작하는 att를 꺼내올수 있음
                const {
                    nodeId
                } = e.currentTarget.dataset

                //방금 클릭한 요소의 node를 찾는다
                const selectedNode = this.state.nodes.find(node => node.id == nodeId)

                //클릭한 것에 대한 node를 찾았다면 onClick 작동
                if (selectedNode) {
                    this.onClick(selectedNode)
                }

            })
        })
    }
    this.render()
}