import React from 'react'

const FormButton = ({value}) => {
  return (
    <div className='submit'>
        <button type="submit" name="action" value={value}>{value.toUpperCase()}</button>

{/*         <input type="submit" value="Done" />
 */}    
 </div>
  )
}

export default FormButton