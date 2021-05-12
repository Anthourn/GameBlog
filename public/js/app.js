class App extends React.Component{
    state = {
        title:"",
        year:"",
        genre:"",
        review:"",
        image:"",
        games:[]


    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
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
                    <img src ={game.image} alt = {game.title}/>
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
