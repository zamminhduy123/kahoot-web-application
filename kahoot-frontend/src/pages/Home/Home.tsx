import React from 'react'
import Header from '../../components/Header'
import { IUser } from '../../model/interface/user.model'

const Home = () => {
  const user : IUser = {
    id : 'US01',
    fullName : 'Duy Nguyen',
    lastName : 'Duy',
    firstName: 'Nguyen',
    email: 'ntminhduy@yahoo.com'
  }
  return (
    <div><Header user={user}/></div>
  )
}

export default Home