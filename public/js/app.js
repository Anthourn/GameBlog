class App extends React.Component{
    state = {
        title:"",
        year:"",
        genre:"",
        review:"",
        image:"",
        modal:'closed',
        filter:'img',
        switch:'on',
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
                modal:'closed',
                filter:'img',
                switch:'on'
            })
        })
    }

    updateGame = (event) => {
        event.preventDefault()
        const id = event.target.id
        axios.put('/games/' + id, this.state).then((response) => {
            this.setState({
                games: response.data,
                title:'',
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
    revealModal = () => {
        this.setState({
            modal:'open',
            filter:'img-modal',
            switch:'off'
        })
    }
    closemodal = () => {
        this.setState(
            {modal:'closed',
            filter:'img',
            switch:'on'
        })

    }
    warning = () => {
        this.setState({
            filter:'greyScale'
        })
    }
    reset = () => {
        this.setState({
            filter:'img'
        })
    }
    render = () => {
        return <div>
        <button className='waves-effect waves-light btn' onClick={this.revealModal}>New Game</button>
        <div className={this.state.modal}>
        <div className='modal-content'>
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
            <br/>
            <label htmlFor="image">Image</label>
            <input type="text" id="image" onChange={this.handleChange}
             />
            <label htmlFor="year">Year</label>
            <input type="text" id="year" onChange={this.handleChange}
             />
            <label htmlFor="genre">Genre</label>
            <input type="text" id="genre" onChange={this.handleChange}
             />
            <br/>
            <label htmlFor="review">Review</label>
            <input type="text" id="review" onChange={this.handleChange}
             />
            <br/>
            <br/>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>
        </form>
        <button className='button' onClick={this.closemodal}>Cancel</button>
        </div>
        </div>
        <ul>
        {this.state.games.map(
            (game =>{
                return (

                    <li key = {game._id}>
                    <h3 className={this.state.switch}>{game.title}</h3><br/>
                    <article className={this.state.switch}>
                    {game.genre}<br/>
                    {game.year}<br/>

                    {game.review}
                    </article>
                    <img class = {this.state.filter} src ={game.image} alt = {game.title}/><br/>
                    <details>
                        <summary className={this.state.switch}>Edit Game</summary>
                            <form id={game._id} onSubmit={this.updateGame}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                        <br/>

                            <label htmlFor="image">Image</label>
                            <br/>
                            <input type="text" id="image" onChange={this.handleChange} />
                            <br/>
                            <label htmlFor="genre">Genre</label>
                            <input type="text" id="genre" onChange={this.handleChange}
                             />
                            <br/>
                            <label htmlFor="year">Year</label>
                            <input type="text" id="year" onChange={this.handleChange}
                             />
                            <label htmlFor="review">Review</label>
                            <br/>
                            <input type="text" id="review" onChange={this.handleChange}/>
                            <input type="submit" className="btn waves-effect waves-light" value="Update Game"/>
                        </form>
                        <button  value={game._id} onMouseEnter={this.warning} onMouseLeave={this.reset} onClick={this.deleteGame}>
                        DELETE </button>
                        </details>
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
