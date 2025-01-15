import React from 'react'

const AddContact = () => {
  return (
    <form>
      <div>
        <label for="name">Who is it? </label>
        <input type="text" name="name" id="name" required />
      </div>
      <p>UPLOAD IMAGE</p>
      <div>
        <label for="target">Aim to talk with them every </label>
        <input type="text" name="target" id="target" required />
        <p>days</p>
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  )
}

export default AddContact