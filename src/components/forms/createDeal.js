"use client"
import { Button, Form, Input, Select, SelectItem } from '@heroui/react'
import React from 'react'

const CreateDeal = () => {
  return (
    <div>
         <Form>
      <Select label="Transaction Type" required>
        <SelectItem >Purchase</SelectItem>
        {/* <option value="sale">Sale</option> */}
      </Select>
      <Input label="First Name" required />
      <Input label="Last Name" required />
      <Input label="Email" type="email" required />
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  )
}

export default CreateDeal