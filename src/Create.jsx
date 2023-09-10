import React ,{useState} from 'react'
import { addItem } from './ItemReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [name, setName] = useState('')
  const [parent_id, setParentId] = useState() 
  const [id, setId] = useState() 
  const items = useSelector((state)=> state.items)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(addItem({id ,name,parent_id}))
    navigate('/')
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-secondary text-white p-5'>
        <h3>Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' className='form-control' placeholder='Enter Name' 
            onChange={e =>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="id">Id:</label>
            <input type="number" min={1} name='id' className='fomr-control'
            onChange={e =>setId(+e.target.value)} />
          </div>
          <div>
            <label htmlFor="parent_id">Parent Id:</label>
            <input type="number" min={1} name='parent_id' className='fomr-control'
            onChange={e =>setParentId(+e.target.value)} />
          </div><br />
          <button className='btn btn-info'>Submit</button>
        </form>
      </div>
      

    </div>
  )
}

export default Create
