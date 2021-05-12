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

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/games', this.state).then((response) => {
            this.setState({games: response.data,
                title: '',
                year:'',
                genre:'',
                review:'',
                image:'',
            })
        })
    }

    updateGame = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/games/' + id, this.state).then((response) => {
            this.setState({
                games: response.data,
                title: '',
                year:'',
                genre:'',
                review:'',
                image:'',
            })
        })

    }

    deleteGame = (event) => {
        axios.delete('/games/' + event.target.value).then(response => {
            this.setState({
                games: response.data,
            })
        })
    }
    componentDidMount = () => {
        axios.get('/games').then((response) =>{
            this.setState({games:response.data})
        })
    }
    render = () => {
        return <div>
        <h1>Testing</h1>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
            <br/>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" onChange={this.handleChange}
            value={this.state.image} />
            <br/>
            <input type="submit" value="Create Game"/>
        </form>

        <ul>
        {this.state.games.map(
            (game =>{
                return (
                    <li key = {game._id}>
                    {game.title}<br/>
                    {game.genre}<br/>
                    {game.year}<br/>
                    <img src ={game.image} alt = {game.title}/><br/>
                    {game.review}
                        <summary>Edit Game</summary>
                        <form id={game._id} onSubmit={this.updateGame}>
                            <label htmlFor="title">Title</label>
                            <br/>
                            <input type="text" id="title" onChange={this.handleChange}/>
                            <label htmlFor="image">Image</label>
                            <br/>
                            <input type="text" id="image" onChange={this.handleChange} />
                            <br/>
                            <input type="submit" value="Update Game"/>
                        </form>
                        <button value={game._id} onClick={this.deleteGame}>
                        DELETE </button>
                    </li>
                )
            })
        )}
        </ul>
        </div>
    }
}


ReactDOM.render(
    <App></App>, document.querySelector('main')
)
