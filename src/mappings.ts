import * as ERC20Event from '../generated/ERC20/ERC20'
import * as Schema from '../generated/schema'
import { updateUser } from './update'

export function handleTransfer(event: ERC20Event.Transfer): void {
  const entity = new Schema.Transfer(event.transaction.hash.toHex() + '-' + event.logIndex.toString())

  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.value

  entity.block = event.block.number
  entity.timestamp = event.block.timestamp

  entity.save()
  updateUser(event)
}

export function handleApproval(event: ERC20Event.Approval): void {
  const entity = new Schema.Transfer(event.transaction.hash.toHex() + '-' + event.logIndex.toString())

  entity.from = event.params.owner
  entity.to = event.params.spender
  entity.amount = event.params.value

  entity.block = event.block.number
  entity.timestamp = event.block.timestamp

  entity.save()
}
