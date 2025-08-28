import React from 'react'
import prisma from '@repo/db/client'
const page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      {JSON.stringify(users)}
      hello hanni
    </div>
  )
}

export default page