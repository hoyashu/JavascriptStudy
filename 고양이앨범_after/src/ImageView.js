const IMAGE_PATH_PREFIX = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public'


function ImageView({
    $app,
    initialState
}) {
    //image url
    //함수 표현식에서는 필드 선언이 안됨
    this.state = initialState //이미지 경로
    this.$target = document.createElement('div')
    this.$target.className = "Modal ImageViewer"

    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState

        this.rander()
    }

    this.rander = () => {
        this.$target.innerHTML = `<div class="content">${this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">` : ''}</div>`

        this.$target.style.display = this.state ? 'block' : 'none'

        //랜더링 이후 클릭 이벤트추가
        this.$target.addEventListener('click', (e) => {
            if (e.target == e.currentTarget) {
                console.log("지워져라 얍")
                this.setState(false)
                return false
            }
        })
    }
    
    this.rander() 

}