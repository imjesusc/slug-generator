'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'
import { useState } from 'react'
import SlugForm from '../organisms/slug-form'

const CreateForm = () => {
  const [status, setStatus] = useState(false)
  return (
    <Dialog open={status} onOpenChange={setStatus}>
      <DialogTrigger asChild>
        <Button variant={'shadow'}>Create</Button>
      </DialogTrigger>

      <DialogContent className="tablet:min-w-[650px] h-auto">
        <DialogHeader>
          <DialogTitle>Create Custom Slug</DialogTitle>
        </DialogHeader>

        <SlugForm setStatus={setStatus} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateForm
