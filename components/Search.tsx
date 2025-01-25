'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useSearchParams } from 'next/navigation'
import { getFiles } from '@/lib/actions/file.actions'
import { Models } from 'node-appwrite'
import { Thumbnail } from './Thumbnail'
import { FormattedDateTime } from './FormattedDateTime'

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if(!searchQuery) {
      setQuery('');
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFiles({ searchText: query });
      setResults(files.documents);
      setOpen(true);
    }

    fetchFiles();
  }, [query])

  useEffect(() => {
    console.log(results)
  }, [results])

  return (
    <div className='search dark:!text-white'>
      <div className='search-input-wrapper dark:!bg-[#1a1c20]'>
        <Image 
          src='/assets/icons/search.svg'
          alt='svg'
          width={24}
          height={24}
          className='dark:fill-gray-300'
        />

        <Input 
          value={query}
          placeholder='Search...'
          className='search-input'
          onChange={(e) => setQuery(e.target.value)}
        />

        {
          open === true && (
            <ul className='search-result'>
              {
                results.length > 0 ? (
                  results.map(file => (
                    <li 
                      key={file.$id}
                      className='flex items-center justify-between'
                    >
                      <div className='flex cursor-pointer items-center gap-4'>
                        <Thumbnail 
                          type={file.type}
                          extension={file.extension}
                          url={file.url}
                          className='size-9 min-w-9'
                        />

                        <p className='subtitle-2 line-clamp-1 text-light-100'>{file.name}</p>
                      </div>

                      <FormattedDateTime 
                        date={file.$createdAt}
                        className='caption line-clamp-1 text-light-200'
                      />
                    </li>
                  ))
                ) : (
                  <p className='empty-result'>No files found</p>
                )
              }
            </ul>
          )
        }
      </div>
    </div>
  )
}

export default Search
