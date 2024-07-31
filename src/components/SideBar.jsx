import React from 'react'

export default function SideBar(props) {

    const { showModal, handleToggleModal, data } = props
  return (
    <div className='sideBar'>
        <div onClick = {handleToggleModal}
        className="bgOverlay"></div>
        <div className="sideBarContents">
            <h2>{data?.title}</h2>
            <div className='descContainer'>
                <p className='descTitle'>{data?.date}</p>
                <p>{data?.explanation}</p>
            </div>

            <button onClick = {handleToggleModal}>
                <i className='fa-solid fa-arrow-right'></i>
            </button>
        </div>
    </div>
  )
}
