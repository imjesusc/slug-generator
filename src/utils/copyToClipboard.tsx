import { CopyIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

export const copyToClipboard = async (txt: string) => {
  try {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([txt], { type: 'text/plain' })
    })
    await navigator.clipboard.write([clipboardItem])
  } catch (error) {
    await navigator.clipboard.writeText(txt)
  }
  toast('Copied to clipboard', {
    icon: <CopyIcon />
  })
}
