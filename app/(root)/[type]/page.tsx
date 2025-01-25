import { Card } from '@/components/Card';
import { CardSkeleton } from '@/components/CardSkeleton';
import { Sort } from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { getFileTypesParams } from '@/lib/utils';
import { Models } from 'node-appwrite';
import React from 'react'

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';

  console.log(types)


  const files = await getFiles({ types: types, searchText, sort });

  return (
    <div className='page-container dark:!bg-[#1a1c20]'>
      <section className='w-full'>
        <h1 className='h1 dark:text-white'>{type}</h1>

        <div className='total-size-section'>
          <p className='body-1 dark:!text-light-200'> 
            Total: <span className='h5 dark:!text-gray-300'>0 MB</span>
          </p>

          <div className='sort-container'>
            <p className='body-1 hidden sm:block text-light-200'>Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {
        files.total > 0 ? (
          <section className='file-list'>
            {
              files.documents ? (
                files.documents.map((file: Models.Document) => (
                  <Card 
                    key={file.$id}
                    file={file}
                  />
                ))
              ) : (
                <CardSkeleton />
              )
            }
          </section>
        ) : (
          <p className='empty-list'>No files uploaded</p>
        )
      }
    </div>
  )
}

export default Page
