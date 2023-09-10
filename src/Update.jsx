import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { updateItem } from './ItemReducer';

function Update() {
const {id} = useParams();
const items = useSelector((state)=> state.items);
const existingItem = items.filter(f => f.id == id)
const {name , parent_id} = existingItem[0]
const [uname, setName] = useState(name)
const [uparent_id, setParentId] = useState(parent_id)
const dispatch = useDispatch();
const navigate = useNavigate();

const handleUpdate = (event) =>{
  event.preventDefault();
  dispatch(updateItem({
    id: id,
    name: uname,
    parent_id: uparent_id
  }))
  navigate('/')
}

return (
<div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
  <div className='w-50 border bg-secondary text-white p-5'>
    <h3>Update Item</h3>
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
        type="text" 
        name='name' 
        className='form-control' 
        placeholder='Enter Name' 
        value={uname} 
        onChange={e => setName(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="parent_id">Parent Id:</label>
        <input 
        type="number" 
        min={1} 
        name='parent_id' 
        className='fomr-control' 
        value={uparent_id}
        onChange={e => setParentId(e.target.value)} />
      </div><br />
      <button className='btn btn-info'>Submit</button>
    </form>
  </div>
</div>
)
}

export default Update