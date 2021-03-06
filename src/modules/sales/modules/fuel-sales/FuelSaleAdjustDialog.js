import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import {
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import CancelButton from '../../../shared/CancelButton'
import DialogAppBar from '../../../shared/DialogAppBar'
import SaveButton from '../../../shared/SaveButton'
import { fmtNumber } from '../../../../utils/fmt'
import { adjustFuelSale } from '../../actions'

const useStyles = makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: 500,
  },
  descriptionField: {
    width: '100%',
  },
  errorTxt: {
    color: 'red',
  },
  numberInput: {
    textAlign: 'right',
  },
  table: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: 160,
  },
}))

const reqFields = ['dollarAdjust', 'litreAdjust']

export default function FuelSaleAdjustDialog(props) {
  const {
    onClose,
    open,
    selectedRecord,
    shiftID,
  } = props
  const classes = useStyles()
  const [state, setState] = useState({})
  const [errors, setError] = useState({})
  const dispatch = useDispatch()

  const handleCheckError = (e, field) => {
    const { value } = e.currentTarget
    if (Number(value) <= 0) {
      setError(err => ({ ...err, [field]: true }))
    }
  }

  const handleClose = () => {
    onClose()
    setError({})
    setState({})
  }

  const handleSetValue = (e, key) => {
    // Clear any previous errors
    if (errors[key]) {
      setError(err => ({ ...err, [key]: false }))
    }
    const { value } = e.currentTarget
    setState({ ...state, [key]: value })
  }

  const handleSubmit = () => {
    reqFields.forEach((f) => {
      if (Number(state[f]) <= 0) {
        setError(err => ({ ...err, [f]: true }))
      }
    })

    if (Object.values(errors).filter(err => err).length) return

    const params = {
      dispenserID: selectedRecord.dispenserID.id,
      recordNum: selectedRecord.recordNum,
      shiftID,
      stationID: selectedRecord.stationID,
      type: 'fuelSale',
      values: {
        description: state.description,
        dollars: {
          open: selectedRecord.dollars.open,
          adjust: parseFloat(state.dollarAdjust),
        },
        litres: {
          open: selectedRecord.litres.open,
          adjust: parseFloat(state.litreAdjust),
        },
      },
    }

    // console.log('params:', params)
    dispatch(adjustFuelSale(params))
    handleClose()
  }

  useEffect(() => (
    () => {
      setError({})
      setState({})
    }
  ), [])

  if (!selectedRecord.dollars) return null
  const { dollars, litres } = selectedRecord

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogAppBar
        closeHandler={handleClose}
        title="Adjust Fuel Sale Record"
      />

      <DialogContent className={classes.content}>
        <Table size="small" className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell>
                {`Open Dollar: ${fmtNumber(dollars.open)}`}
              </TableCell>
              <TableCell>
                {`Open Litre: ${fmtNumber(litres.open, 3)}`}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControl>
                  <TextField
                    autoFocus
                    className={classes.textField}
                    error={errors.dollarAdjust}
                    id="dollarAdjust"
                    inputProps={{
                      className: classes.numberInput,
                    }}
                    onBlur={e => handleCheckError(e, 'dollarAdjust')}
                    onChange={e => handleSetValue(e, 'dollarAdjust')}
                    label="Dollar Adjust"
                    margin="dense"
                    required
                    type="number"
                    value={state.dollarAdjust}
                  />
                  <FormHelperText className={classes.errorTxt}>
                    {errors.dollarAdjust && <span>Required field</span>}
                  </FormHelperText>
                </FormControl>
              </TableCell>

              <TableCell>
                <FormControl>
                  <TextField
                    className={classes.textField}
                    error={errors.litreAdjust}
                    id="litreAdjust"
                    inputProps={{
                      className: classes.numberInput,
                    }}
                    onBlur={e => handleCheckError(e, 'litreAdjust')}
                    onChange={e => handleSetValue(e, 'litreAdjust')}
                    label="Litre Adjust"
                    margin="dense"
                    required
                    type="number"
                    value={state.litreAdjust}
                  />
                  <FormHelperText className={classes.errorTxt}>
                    {errors.litreAdjust && <span>Required field</span>}
                  </FormHelperText>
                </FormControl>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <TextField
                  className={classes.descriptionField}
                  id="description"
                  onChange={e => handleSetValue(e, 'description')}
                  label="Description"
                  margin="dense"
                  rowsMax="2"
                  multiline
                  value={state.description}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <SaveButton
              submitHandler={handleSubmit}
              label="Save Adjustment"
            />
          </Grid>

          <Grid item xs={5}>
            <CancelButton
              cancelHandler={handleClose}
              label="Cancel"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
FuelSaleAdjustDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedRecord: PropTypes.instanceOf(Object).isRequired,
  shiftID: PropTypes.string.isRequired,
}
