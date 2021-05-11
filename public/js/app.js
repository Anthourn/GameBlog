class App extends React.Component{
    state = {
        title:"",
        year:"",
        genre:"",
        review:"",
        image:"",
        games:[]


    }
    componentDidMount = () => {
        axios.get('/games').then((response) =>{
            this.setState({games:response.data})
        })
    }
    render = () => {
        return <div>
        <h1>Testing</h1>
        <div>
        <ul>
        {this.state.games.map(
            (game =>{
                return (
                    <li key = {game._id}>
                    {game.title}
                    {game.genre}
                    {game.year}
                    {game.image}
                    {game.review}
                    </li>
                )
            })
        )}
        </ul>
        </div>
        </div>
    }
}


ReactDOM.render(
    <App></App>, document.querySelector('main')
)
