import {Switch, Redirect, Route} from 'react-router-dom'

import Login from './components/LoginPage'
import NotFound from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Homepage from './components/Homepage'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute exact path="/" component={Homepage} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
