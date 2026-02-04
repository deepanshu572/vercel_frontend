import React from 'react'
import { Link } from 'react-router-dom'

const ProjectBox = ({title,description,id}) => {
  return (
    <Link to={`view/${id}`} className="border border-gray-200 flex items-center justify-center flex-col text-center rounded-lg p-4 w-64 h-48 bg-white shadow-sm">
      <h1 className='text-4xl'>📁</h1>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </Link>
  )
}

export default ProjectBox