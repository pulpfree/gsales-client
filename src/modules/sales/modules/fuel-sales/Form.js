import React from 'react'

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({ // eslint-disable-line no-unused-vars
  root: {
    width: '100%',
  },
  title: {},
}))

export default function Form() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Fuel Sale Form
    </div>
  )
}
