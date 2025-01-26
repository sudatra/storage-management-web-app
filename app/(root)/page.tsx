import { ActionsDropdown } from "@/components/ActionsDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

export default async function Home() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed()
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        <ul className="dashboard-summary-list">
          {
            usageSummary.map((summary) => (
              <Link
                href={summary.url}
                key={summary.title}
                className="dashboard-summary-card dark:!bg-black"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-3">
                    <Image 
                      src={summary.icon}
                      width={100}
                      height={100}
                      alt="uploaded image"
                      className="summary-type-icon"
                    />

                    <h4 className="summary-type-size">{convertFileSize(summary.size) || 0}</h4>
                  </div>

                  <h5 className="summary-type-title dark:!text-gray-300">{summary.title}</h5>
                  <Separator className="bg-light-400" />
                  <FormattedDateTime 
                    date={summary.latestDate}
                    className="text-center dark:text-gray-300"
                  />
                </div>
              </Link>
            ))
          }
        </ul>
      </section>

      <section className="dashboard-recent-files dark:!bg-black">
        <h2 className="h3 xl:h2 text-light-100 dark:!text-gray-300">Recent Files Uploaded</h2>

        {
          files.total > 0 ? (
            <ul className="mt-5 flex flex-col gap-5">
              {
                files.documents.map((file: Models.Document) => (
                  <Link
                    href={file.url}
                    key={file.$id}
                    target="_blank"
                    className="flex items-center gap-3 p-2 bg-light-400 rounded-[20px] dark:!bg-[#1a1c20]"
                  >
                    <Thumbnail 
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                    />

                    <div className="recent-file-details">
                      <div className="flex flex-col gap-1">
                        <p className="recent-file-name dark:!text-gray-300">{file.name}</p>
                        <FormattedDateTime 
                          date={file.$createdAt}
                          className="caption"
                        />
                      </div>

                      <ActionsDropdown file={file} />
                    </div>
                  </Link>
                ))
              }
            </ul>
          ) : (
            <p className="empty-list">No files Uploaded</p>
          )
        }
      </section>
    </div>
  );
}
