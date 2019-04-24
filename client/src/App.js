import React, { Component } from 'react'
import { Route, NavLink} from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Friends from './components/view/Friends.js'
import AddFriend from './components/view/AddFriend'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      edit: false,
      users: []
    }
  }
  componentDidMount(){
    this.getUsers()
  }

  getUsers = (id)=>{
    axios.get(`http://localhost:4003/api/users/${id ? id : ''}`)
      .then((res)=>{
        // console.log(res)
        this.setState({users: res.data})
      })
      .catch(e=>{
        console.log(e)
      })
  }

  toggleHome = ()=>{
    this.setState({ edit: !this.state.edit })
  }

  deleteUser=(id)=>{
    axios.delete(`http://localhost:4003/api/users/${id}`)
      .then(res=>{
        console.log(res)
        if(res.data ===1 ){
          this.getUsers()
        }
      })
      .catch(e=>{
        console.log(e)
      })
  }
  render () {
    return (
      <div className='App'>
        <div className='navbar'>
          <nav>
            <NavLink to='/friends'>
            <h1>
            Lambda Users
            </h1>
            </NavLink>
        </nav> 
        </div>
        <div className='main'>
          {/* <Route exact path='/' component={Login} /> */}
          {!this.state.edit
        ? <Route exact path='/' render={(props)=>{
          return <Friends {...props} deleteUser={this.deleteUser} friends={this.state.users}  />
        }} />
        : <Route exact path='/' render={(props)=>{
              return <AddFriend toggle={this.toggleHome} {...props} />
        }} />
          }
          <Route exact path='/' render={(props)=>{
            return <AddFriendButton {...props} toggle={this.toggleHome} />
          }} />
        </div>
      </div>
    )
  }
}
const AddFriendButton = props => (
  <div className='add-friend'>
  <button onClick={() => {
    props.toggle()
    // props.history.push('/')
    // <Redirect path={'/'} />
  }}>
  Add User
  </button>
</div>
)

export default App
