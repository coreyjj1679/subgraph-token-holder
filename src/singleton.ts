import { Address } from '@graphprotocol/graph-ts'
import * as Schema from '../generated/schema'
import * as constants from './common/constants'

export function getUser(userAddress: Address): Schema.User {
  let user = Schema.User.load(userAddress.toHexString())

  if (user === null) {
    user = new Schema.User(userAddress.toHexString())
    user.tokenBalance = constants.ZERO_BI

    user.save()
  }

  return user as Schema.User
}

export function getInfo(): Schema.Info {
  let info = Schema.Info.load('1')

  if (info === null) {
    info = new Schema.Info('1')
    info.transactionCount = constants.ZERO_BI
    info.tokenHolder = constants.ZERO_BI

    info.save()
  }

  return info as Schema.Info
}
