import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import { Thumbnail } from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import { FormattedDateTime } from './FormattedDateTime'
import { getUserById } from '@/lib/actions/user.actions'
import { ActionsDropdown } from './ActionsDropdown'

export const Card = async ({ file }: { file: Models.Document }) => {
  const fileOwner = await getUserById(file.ownerId);

  return (
    <Link 
      href={file.url}
      target='_blank'
      className='file-card dark:!bg-black'
    >
      <div className='flex justify-between'>
        <Thumbnail 
          type={file.type}
          extension={file.extension}
          url={file.url}
          className='!size-20'
          imageClassName='!size-11'
        />

        <div className='flex flex-col items-end justify-between'>
          <ActionsDropdown file={file} />

          <p className='body-1'>{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className='file-card-details'>
        <p className='subtitle-2 line-clamp-1 dark:text-[#e5e7eb]'>{file.name}</p>
        <FormattedDateTime 
          date={file.$createdAt}
          className="body-2 text-light-100 dark:text-[#e5e7eb]"
        />
        {
          fileOwner && (
            <p className='caption line-clamp-1 text-light-200'>By: {fileOwner.fullName}</p>
          )
        }
      </div>
    </Link>
  )
}
