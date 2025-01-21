import React from 'react'
import { Skeleton } from './ui/skeleton'

export const CardSkeleton = () => {
  return (
    <div className='file-card animate-pulse'>
      <div className='flex justify-between'>
        <Skeleton className='bg-gray-300 !size-20 rounded-full' />

        <div className='flex flex-col items-end justify-between'>
          <Skeleton className='w-16 h-4 bg-gray-300 mb-2' />
          <Skeleton className='w-10 bg-gray-300 h-4' />
        </div>
      </div>

      <div className='file-card-details'>
        <Skeleton className='w-3/4 h-4 bg-gray-300 mb-2' />
        <Skeleton className='w-1/2 h-3 bg-gray-300 mb-2' />
        <Skeleton className='w-1/3 h-3 bg-gray-300' />
      </div>
    </div>
  )
}
