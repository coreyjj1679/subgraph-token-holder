import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import * as constants from './constants'

export function exponentToBigInt(decimals: BigInt): BigInt {
  let bd = BigInt.fromString('1')
  for (let i = constants.ZERO_BI; i.lt(decimals as BigInt); i = i.plus(constants.ONE_BI)) {
    bd = bd.times(BigInt.fromString('10'))
  }
  return bd
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = constants.ZERO_BI; i.lt(decimals as BigInt); i = i.plus(constants.ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000')
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  if (eth === constants.ZERO_BI) return constants.ZERO_BD
  return eth.toBigDecimal().div(exponentToBigDecimal(constants.BI_18))
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: i32): BigDecimal {
  if (exchangeDecimals === 0) {
    return tokenAmount.toBigDecimal()
  }

  if (tokenAmount === constants.ZERO_BI) {
    return constants.ZERO_BD
  }

  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(BigInt.fromI32(exchangeDecimals)))
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString())
  const zero = parseFloat(constants.ZERO_BD.toString())
  if (zero == formattedVal) {
    return true
  }
  return false
}
