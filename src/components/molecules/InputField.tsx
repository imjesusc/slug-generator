import { Input, Label } from '@/components/ui'
import { cn } from '@/lib/utils'
import { type FC } from 'react'

interface InputFieldProps {
  label: string
  value?: string
  name: string
  placeholder: string
  className?: string
  field?: any
}

export const InputField: FC<InputFieldProps> = ({ label, value, name, placeholder, field, className }) => {
  return (
    <div className={cn(className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name}
      value={value}
      name={name}
      placeholder={placeholder}
      {...field}
      />
    </div>
  )
}
