import React from 'react'

const ConfirmDelete = ({ onCancel, onConfirm }) => {
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center' >

            <div className='bg-white p-4 rounded-lg text-black' >
                <h2 className='text-xl font-semibold' >Are you sure? To delete this user?</h2>

                <div className='flex gap-4 justify-end mt-8' >
                    <button onClick={onCancel} className='bg-blue-600 px-4 py-1 rounded-lg text-white' >Cancel</button>
                    <button onClick={onConfirm} className='bg-red-600 px-4 py-1 rounded-lg text-white' >Delete</button>
                </div>
            </div>

        </div>
    )
}

export default ConfirmDelete
