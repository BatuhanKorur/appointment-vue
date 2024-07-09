import type { Agent, Contact } from '@/types'
export default function initials(obj: Agent | Contact) {
  return `${obj.first_name.charAt(0).toUpperCase()}${obj.last_name.charAt(0).toUpperCase()}`
}
