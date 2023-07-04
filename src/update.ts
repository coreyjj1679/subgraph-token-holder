import { BigInt, store } from '@graphprotocol/graph-ts'
import { getInfo, getUser } from './singleton'
import { User } from '../generated/schema'
import * as ERC20Event from '../generated/ERC20/ERC20'
import * as constants from './common/constants'

class UserInfo {
  entity: User
  prevBalance: BigInt
}

export function updateUser(event: ERC20Event.Transfer): void {
  let userFrom = getUser(event.params.from)
  let userTo = getUser(event.params.to)
  let info = getInfo()

  let prevBalanceFrom = userFrom.tokenBalance
  let prevBalanceTo = userTo.tokenBalance

  if (event.params.from != constants.NULL.TYPE_ADDRESS) {
    userFrom.tokenBalance = userFrom.tokenBalance.minus(event.params.value)
  }
  if (event.params.to != constants.NULL.TYPE_ADDRESS) {
    userTo.tokenBalance = userTo.tokenBalance.plus(event.params.value)
  }

  let users: UserInfo[] = [
    { entity: userFrom, prevBalance: prevBalanceFrom },
    { entity: userTo, prevBalance: prevBalanceTo },
  ]

  for (let i = 0; i < users.length; ++i) {
    let user = users[i]
    // new hodler
    if (user.prevBalance == constants.ZERO_BI && user.entity.tokenBalance.gt(constants.ZERO_BI)) {
      info.tokenHolder = info.tokenHolder.plus(constants.ONE_BI)
    }
    // Not hodling anymore
    else if (user.entity.tokenBalance == constants.ZERO_BI) {
      info.tokenHolder = info.tokenHolder.minus(constants.ONE_BI)
      store.remove('User', user.entity.id)
      continue
    }

    user.entity.lastUpdateBlock = event.block.number
    user.entity.lastUpdateTimestamp = event.block.timestamp
    user.entity.save()
  }

  info.transactionCount = info.transactionCount.plus(constants.ONE_BI)
  info.lastUpdateBlock = event.block.number
  info.lastUpdateTimestamp = event.block.timestamp

  info.save()
}
