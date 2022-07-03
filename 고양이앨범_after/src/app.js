//nodes를 위에서 조율하기 위한 app컴포넌트 작성
function App($app) {
    //필드
    this.state = {
        isRoot: true,
        nodes: [],
        depth: [],
        selecedFilePath: null
    }

    //이미지 상세보기 인스턴스 생성과 동시에 렌더링
    const imageView = new ImageView({
        $app,
        initialState : this.state.selecedFilePath
    })

    //네비 인스턴스 생성과 동시에 렌더링
    const breadcrumb = new BreadcrumbF({
        $app,
        initialState: this.state.depth
    })

    //App 컴포넌트에도 setState함수 정의하기
    this.setState = (nextState) => {
        console.log("App.setState실행")

        this.state = nextState
        
        //네비 재설정 (이동한 디렉토리node값이 배열로 저장됨)
        breadcrumb.setState(this.state.depth)

        //노드 재설정
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })

        //이미지 뷰어 재설정
        imageView.setState(this.state.selecedFilePath)
    }

    //노드 인스턴스 생성과 동시에 렌더링
    const nodes = new Nodes({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        //함수 파라메터로 던지고, nodes내에서 click발생시 이 함수를 호출하게 함
        //이러면 nodes내에선 click후 어떤 로직이 일어날지 알아야 할 필요가 없음, 여기서 처리하니까
        //이렇게 하면 app에서 두 컴포넌트(네비, 노드)를 조율하는 형태가 되며, 두 컴포넌트는 독립적으로 동작하고 또다른 곳에 쉽게 재활용 할 수 있는 구조가 된다.
        onClick: async (node) => {
            if (node.type === "DIRECTORY") {
                //여기에서 nav를 처리하면 nodes컴포넌트에서는 nav가 어떻게 작동할지 몰라도 됨. 오염이 줄어듬
                //현재 노드를 parent로 가지는 nodes가져옴
                const nextNodes = await request(node.id)
                console.log({...this.state, a:"ddd"})
                this.setState({
                    ...this.state,
                    isRoot:false,
                    //현재 노드추가
                    //[...this.state.depth, node] = this.state.depth.push(node)
                    depth: [...this.state.depth, node],
                    //다음 노드 추가하기
                    nodes: nextNodes
                })
            } else if (node.type === "FILE") {
                //"이미지 보기" 컴포넌트로 만들기
                this.setState({
                    ...this.state,
                    selecedFilePath: node.filePath
                })
            } else {

            }
        }
    })

    const init = async () => {
        console.log("init실행")
        try {
            //root data가져옴
            const rootNodes = await request()

            //셋팅해줌
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch (e) {
            console.error(e)
        }
    }

    init()
}