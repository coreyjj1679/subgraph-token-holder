import { BigInt, BigDecimal, Address, Bytes } from '@graphprotocol/graph-ts'

export namespace NULL {
  export const TYPE_STRING = '0x0000000000000000000000000000000000000000'
  export const TYPE_ADDRESS = Address.fromString(TYPE_STRING)
  export const TYPE_BYTES = Bytes.fromHexString(TYPE_STRING)
}
export const ZERO_BI = BigInt.fromI32(0)
export const ONE_BI = BigInt.fromI32(1)
export const ZERO_BD = BigDecimal.fromString('0')
export const ONE_BD = BigDecimal.fromString('1')
export const TWO_BD = BigDecimal.fromString('2')
export const BI_18 = BigInt.fromI32(18)
