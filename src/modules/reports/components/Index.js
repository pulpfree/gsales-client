import React from 'react'

import { Switch, Redirect, Route } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import TitleBar from './TitleBar'
import ReportMenu from './Menu'

import Attendant from '../report/attendant/Index'
import Monthly from '../report/monthly/Index'
import OilProductSales from '../report/oil-product-sales/Index'
import ProductSales from '../report/product-sales/Index'
import Shift from '../report/shift/Index'

const useStyles = makeStyles(theme => ({ // eslint-disable-line no-unused-vars
  container: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(2.5),
  },
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

export default function Index() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TitleBar />
      <ReportMenu />
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Switch>
            <Redirect exact from="/reports" to="/reports/attendant" />
            <Route path="/reports/attendant-activity" component={Attendant} />
            <Route path="/reports/monthly-sales" component={Monthly} />
            <Route path="/reports/oil-product-sales" component={OilProductSales} />
            <Route path="/reports/product-sales" component={ProductSales} />
            <Route path="/reports/shift" component={Shift} />
          </Switch>
        </Paper>
      </div>
    </div>
  )
}
