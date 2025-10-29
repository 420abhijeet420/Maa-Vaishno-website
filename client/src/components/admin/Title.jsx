import React from 'react'

const Title = ({Text1, Text2}) => {
return (
    <h1 className='font-medium text-2xl'>
        {Text1}<span className="underline text-primary">
        {Text2}</span>
    </h1>
  )
}

export default Title