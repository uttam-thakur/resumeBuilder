import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>home</h1>
      <p>{localStorage.getItem('expe')}</p>
    </div>
  )
}

export default Home
