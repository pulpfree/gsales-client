import {
  action,
  createRequestTypes,
} from '../../utils/actions'

export const CONFIG = createRequestTypes('CONFIG')
export const DAYSALES = createRequestTypes('DAYSALES')
export const STATIONS = createRequestTypes('STATIONS')
export const SHIFT_SALES = createRequestTypes('SHIFT_SALES')
export const SHIFT_ACTION = createRequestTypes('SHIFT_ACTION')
export const SHIFT_PATCH = createRequestTypes('SHIFT_PATCH')
export const FUEL_SALE = createRequestTypes('FUEL_SALE')
export const NON_FUEL_SALE = createRequestTypes('NON_FUEL_SALE')
export const NON_FUEL_SALE_SAVE = createRequestTypes('NON_FUEL_SALES_SAVE')
export const FUEL_SALE_SAVE = createRequestTypes('FUEL_SALE_SAVE')
export const SHIFT_ITEM = createRequestTypes('SHIFT_ITEM')
export const SHIFT_SUMMARY = createRequestTypes('SHIFT_SUMMARY')

export const RESET_DISPENSER = createRequestTypes('RESET_DISPENSER')
export const ADJUST_FUEL_SALE = createRequestTypes('ADJUST_FUEL_SALE')
export const ADJUST_OTHER_FUEL = createRequestTypes('ADJUST_OTHER_FUEL')
export const ADJUST_NON_FUEL_SALE = createRequestTypes('ADJUST_NON_FUEL_SALE')
export const SET_ADJUST_RECORD_ID = createRequestTypes('SET_ADJUST_RECORD_ID')
export const ADJUST_CASH = createRequestTypes('ADJUST_CASH')
export const PATCH_SIMPLE = createRequestTypes('PATCH_SIMPLE')

export const PROPANE_SALE = 'PROPANE_SALE'

/* export const configEntity = {
  request: request => action(CONFIG.REQUEST, { request }),
  success: response => action(CONFIG.SUCCESS, { response }),
  failure: error => action(CONFIG.FAILURE, { error }),
} */

export const daySalesEntity = {
  request: daySales => action(DAYSALES.REQUEST, { daySales }),
  success: response => action(DAYSALES.SUCCESS, { response }),
  failure: error => action(DAYSALES.FAILURE, { error }),
}

export const shiftEntity = {
  request: shift => action(SHIFT_SALES.REQUEST, { shift }),
  success: response => action(SHIFT_SALES.SUCCESS, { response }),
  failure: error => action(SHIFT_SALES.FAILURE, { error }),
}

/* export const stationEntity = {
  request: station => action(STATIONS.REQUEST, { station }),
  success: (response) => action(STATIONS.SUCCESS, { response }),
  failure: (error) => action(STATIONS.FAILURE, { error }),
} */

/* export const shiftActionEntity = {
  request: shiftAction => action(SHIFT_ACTION.REQUEST, { shiftAction }),
  success: response => action(SHIFT_ACTION.SUCCESS, { response }),
  failure: error => action(SHIFT_ACTION.FAILURE, { error }),
} */

export const shiftPatchEntity = {
  request: request => action(SHIFT_PATCH.REQUEST, { request }),
  success: response => action(SHIFT_PATCH.SUCCESS, { response }),
  failure: error => action(SHIFT_PATCH.FAILURE, { error }),
}

/* export const persistFuelSalesEntity = {
  request: request => action(FUEL_SALE_SAVE.REQUEST, { request }),
  success: response => action(FUEL_SALE_SAVE.SUCCESS, { response }),
  failure: error => action(FUEL_SALE_SAVE.FAILURE, { error }),
} */

/* export const persistNonFuelSalesEntity = {
  request: request => action(NON_FUEL_SALE_SAVE.REQUEST, { request }),
  success: response => action(NON_FUEL_SALE_SAVE.SUCCESS, { response }),
  failure: error => action(NON_FUEL_SALE_SAVE.FAILURE, { error }),
} */

/* export const persistShiftSummaryEntity = {
  request: request => action(SHIFT_SUMMARY.REQUEST, { request }),
  success: response => action(SHIFT_SUMMARY.SUCCESS, { response }),
  failure: error => action(SHIFT_SUMMARY.FAILURE, { error }),
} */

/* export const persistFuelSaleAdjustmentEntity = {
  request: request => action(ADJUST_FUEL_SALE.REQUEST, { request }),
  success: response => action(ADJUST_FUEL_SALE.SUCCESS, { response }),
  failure: error => action(ADJUST_FUEL_SALE.FAILURE, { error }),
} */

/* export const persistNonFuelSaleAdjustmentEntity = {
  request: request => action(ADJUST_NON_FUEL_SALE.REQUEST, { request }),
  success: response => action(ADJUST_NON_FUEL_SALE.SUCCESS, { response }),
  failure: error => action(ADJUST_NON_FUEL_SALE.FAILURE, { error }),
} */

/* export const persistDispenserResetEntity = {
  request: request => action(RESET_DISPENSER.REQUEST, { request }),
  success: response => action(RESET_DISPENSER.SUCCESS, { response }),
  failure: error => action(RESET_DISPENSER.FAILURE, { error }),
} */

/* export const persistCashAdjustEntity = {
  request: request => action(ADJUST_CASH.REQUEST, { request }),
  success: response => action(ADJUST_CASH.SUCCESS, { response }),
  failure: error => action(ADJUST_CASH.FAILURE, { error }),
} */

/* export const persistOtherFuelEntity = {
  request: request => action(ADJUST_OTHER_FUEL.REQUEST, { request }),
  success: response => action(ADJUST_OTHER_FUEL.SUCCESS, { response }),
  failure: error => action(ADJUST_OTHER_FUEL.FAILURE, { error }),
} */

/* export const persistSimplePatchEntity = {
  request: request => action(PATCH_SIMPLE.REQUEST, { request }),
  success: response => action(PATCH_SIMPLE.SUCCESS, { response }),
  failure: error => action(PATCH_SIMPLE.FAILURE, { error }),
} */


// export const fetchStationList = () => action(STATIONS.REQUEST, {})
export const loadShift = params => action(SHIFT_SALES.REQUEST, { params })
export const loadShiftSales = (stationID, params = {}) => action(
  DAYSALES.REQUEST,
  { stationID, params }
)

// export const createShift = (params) => action(SHIFT_ACTION.REQUEST, { params })
// export const removeShift = (params) => action(SHIFT_ACTION.REQUEST, { params })

// export const closeShift = (params) => action(SHIFT_PATCH.REQUEST, { params })
export const updateShift = params => action(SHIFT_PATCH.REQUEST, { params })

// export const updateShiftItem = (params) => action(SHIFT_ITEM.REQUEST, { params })
// export const saveShiftSummary = () => action(SHIFT_SUMMARY.REQUEST)
// export const updateFuelSale = (params) => action(FUEL_SALE.REQUEST, { params })
// export const updateNonFuelSale = (params) => action(NON_FUEL_SALE.REQUEST, { params })
// export const saveFuelSales = () => action(FUEL_SALE_SAVE.REQUEST)
// export const saveNonFuelSales = (params) => action(NON_FUEL_SALE_SAVE.REQUEST, { params })

// export const resetDispenser = (params) => action(RESET_DISPENSER.REQUEST, { params })
// export const setAdjustRecordID = (id) => action(SET_ADJUST_RECORD_ID.REQUEST, { id })
// export const adjustFuelSale = (params) => action(ADJUST_FUEL_SALE.REQUEST, { params })
// export const adjustNonFuelSale = (params) => action(ADJUST_NON_FUEL_SALE.REQUEST, { params })
// export const adjustCash = (params) => action(ADJUST_CASH.REQUEST, { params })
// export const adjustOtherFuel = (params) => action(ADJUST_OTHER_FUEL.REQUEST, { params })
// export const simplePatch = (params) => action(PATCH_SIMPLE.REQUEST, { params })

// export const setPropaneSale = (params) => action(PROPANE_SALE, { params })
