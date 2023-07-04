import { Address, BigDecimal, BigInt, ethereum, log } from '@graphprotocol/graph-ts'
import { ERC20 as ERC20Contract } from '../../generated/ERC20/ERC20'
import { convertTokenToDecimal } from './number'
import * as constants from './constants'

export function readValue<T>(callResult: ethereum.CallResult<T>, defaultValue: T): T {
  if (callResult.reverted) {
    log.error('readValue: contract reverted', [])
    return defaultValue
  } else {
    return callResult.value
  }
}

export namespace ERC20 {
  export function symbol(tokenAddress: Address): string {
    const contract = ERC20Contract.bind(tokenAddress)
    return readValue<string>(contract.try_symbol(), '')
  }

  export function decimal(tokenAddress: Address): i32 {
    const contract = ERC20Contract.bind(tokenAddress)
    return readValue<i32>(contract.try_decimals(), 18)
  }

  export function balanceOf(tokenAddress: Address, userAddress: Address): BigDecimal {
    const contract = ERC20Contract.bind(tokenAddress)
    const _decimal = decimal(tokenAddress)
    return convertTokenToDecimal(
      readValue<BigInt>(contract.try_balanceOf(userAddress), constants.ZERO_BI),
      <i32>_decimal,
    )
  }
}
