import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth'
import React from 'react'

const User = async() => {

  const session = await getServerSession(authOptions);
  return (
    <div>User</div>
  )
}

export default User