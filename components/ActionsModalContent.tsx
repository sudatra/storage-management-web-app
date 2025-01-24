'use client'

import { Models } from 'node-appwrite'
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import { Thumbnail } from './Thumbnail'
import { FormattedDateTime } from './FormattedDateTime'
import { convertFileSize, formatDateTime } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Image from 'next/image'

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<SetStateAction<string[]>>
  onRemove: (email: string) => void;
}

const ImageThumbnail = ({ file }: { file: Models.Document }) => {
  return (
    <div className='file-details-thumbnail dark:!bg-[#1a1c20]'>
      <Thumbnail 
        type={file.type}
        extension={file.extension}
        url={file.url}
      />

      <div className='flex flex-col'>
        <p className='subtitle-2 mb-1 dark:!text-gray-300'>{file.name}</p>
        <FormattedDateTime 
          date={file.$createdAt} 
          className='caption dark:!text-gray-400'
        />
      </div>
    </div>
  )
}

const DetailRow = ({ label, value }: { label: string, value: string | null }) => {
  return (
    <div className='flex'>
      <p className='file-details-label text-left dark:!text-gray-300'>{label}</p>
      <p className='file-details-value text-left dark:!text-white'>{value}</p>
    </div>
  )
}

export const FileDetails = ({ file }: { file: Models.Document }) => {
  const [fileOwnerName, setFileOwnerName] = useState<string | null>(null);
  const cachedFileOwner = useMemo(() => new Map<string, string>(), []);

  useEffect(() => {
    const fetchFileOwner = async () => {
      if(cachedFileOwner.has(file.ownerId)) {
        setFileOwnerName(cachedFileOwner.get(file.ownerId) || null);
      }
      else {
        const fileOwnerDetails = await getUserById(file.ownerId);
        const ownerName = fileOwnerDetails?.fullName;

        setFileOwnerName(ownerName);
        cachedFileOwner.set(file.ownerId, ownerName || '');
      }
    };

    fetchFileOwner();
  }, [file.ownerId, cachedFileOwner]);

  return (
    <>
      <ImageThumbnail file={file} />
      <div className='space-y-4 px-2 pt-2'>
        <DetailRow
          label="Format:"
          value={file.extension}  
        />

        <DetailRow
          label="Size:"
          value={convertFileSize(file.size)}  
        />

        <DetailRow
          label="Owner:"
          value={fileOwnerName}  
        />

        <DetailRow
          label="Last edit:"
          value={formatDateTime(file.$updatedAt)}  
        />
      </div>
    </>
  )
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className='share-wrapper'>
        <p className='subtitle-2 pl-1 text-light-100 dark:!text-gray-300 mb-2'>Share file with other users</p>
        <Input 
          type='email'
          placeholder='Enter email address'
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className='share-input-field'
        />

        <div className='pt-2'>
          <div className='flex justify-between'>
            <p className='subtitle-2 text-light-100 dark:!text-gray-300'>Shared with</p>
            <p className='subtitle-2 text-light-200 dark:!text-gray-300'>{file.users.length} users</p>
          </div>

          <ul className='pt-2'>
            {
              file.users.map((email: string) => (
                <li
                  key={email}
                  className='flex items-center justify-between gap-2'
                >
                  <p className='subtitle-2'>{email}</p>
                  <Button onClick={() => onRemove(email)}>
                    <Image 
                      src='/assets/icons/remove.svg'
                      alt='remove'
                      width={24}
                      height={24}
                      className='rmeove-icon'
                    />
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
