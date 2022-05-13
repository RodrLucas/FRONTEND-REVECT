import React from 'react'

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Cadastro from './containers/Cadastro'
import Lista from './containers/Lista'
import Atualizar from './containers/Atualizar'

function Routes () {
  return (
        <Router>
            <Switch>
                <Route exact component={Cadastro} path='/' />
                <Route exact component={Lista} path='/list' />
                <Route exact component={Atualizar} path='/edit' />
            </Switch>
        </Router>
  )
}

export default Routes
