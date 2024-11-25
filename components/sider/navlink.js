import {
  House, 
  Building2, 
  Hourglass,
  Mail,
  ReceiptText,
  CalendarDays,
  MessageCircle,
  Settings,
  UserRound,
} from "lucide-react"

export const navLinks = [
  {
    href: "/",
    label: 'Main',
    Icon: House
  },
  {
    href: "/pages/connection",
    label: 'connection',
    Icon: Building2
  },
  {
    href: "/pages/time",
    label: 'Time',
    Icon: Hourglass
  },
  {
    href: "/pages/chat",
    label: 'chat',
    Icon: Mail
  },
  {
    href: "/pages/receipt",
    label: 'Receipt',
    Icon: ReceiptText
  },
  {
    href: "/pages/calender",
    label: 'Calender',
    Icon: CalendarDays
  },
  {
    href: "/pages/messages",
    label: 'messages',
    Icon: MessageCircle
  },
  {
    href: "/pages/settings",
    label: 'setting',
    Icon: Settings
  },
  {
    href: "/pages/user",
    label: 'user',
    Icon: UserRound
  }
]