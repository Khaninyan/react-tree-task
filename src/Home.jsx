import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteItem } from './ItemReducer';


function Home() {
    const [active,setActive] = useState([]);
    const items = useSelector((state)=> state.items)
    const dispatch = useDispatch();
    console.log(items)
    const handleDelete = (id) => {
        dispatch(deleteItem({id:id}))
    }

    const getChields = (paretId) => {
        const cieldItems = items.filter((filtredItem) => filtredItem.parent_id === paretId)
        return (
            <div style={{display: active.indexOf(paretId) > -1 ? "block" : "none"}}>
                {cieldItems.map((chield, index) => {
                    return (
                        <div style={{marginLeft: "10px"}}>
                            <div onClick={() => chageActive(chield.id)} style={{marginLeft: "10px", display: "flex", justifyContent: "space-between"}} key={`chield_${paretId}_${index}`}> 
                                <div style={{ width: "25%"}}>{chield.id}</div>
                                <div style={{ width: "25%"}}>{chield.name}</div>
                                <div style={{ width: "25%"}}>{chield.parent_id}</div>
                                <div style={{ width: "25%"}}>
                                    <Link to={`/edit/${chield.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                    <button onClick={() => handleDelete(chield.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                                </div>
                            </div>
                            {getChields(chield.id)}
                        </div>
                    )
                })}
            </div>
        )
    }

    const chageActive = (id) => {
        const newArray = [...active]
        newArray.indexOf(id) > -1 ? newArray.splice(newArray.indexOf(id), 1) : newArray.push(id)
        setActive(newArray)
    }
    
    useEffect(() => {
        console.log(active)
    },[active])

  return (
    <div className='container'>
        <Link to='/create' className="btn btn-success my-3">Create +</Link>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{ width: "25%"}}>ID</div>
                <div style={{ width: "25%"}}>Name</div>
                <div style={{ width: "25%"}}>Parent ID</div>
                <div style={{ width: "25%"}}>Action</div>
            </div>
            {items.filter((filtredItem) => filtredItem.parent_id === null || !filtredItem.parent_id).map((item,index) => (
                <>
                    <div onClick={() => chageActive(item.id)} key={index} style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{ width: "25%"}}>{item.id}</div>
                        <div style={{ width: "25%"}}>{item.name}</div>
                        <div style={{ width: "25%"}}>{item.parent_id}</div>
                        <div style={{ width: "25%"}}>
                            <Link to={`/edit/${item.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                            <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                        </div>
                    </div>
                    {getChields(item.id)}
                </>
            ))}
    </div>
  )
}

export default Home
