import type { Agent, Contact } from '@/types'
export default function fullName(obj: Agent | Contact) {
  return `${obj.first_name} ${obj.last_name}`
}
