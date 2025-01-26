import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";

export default async function Home() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed()
  ]);

  return (
    <div className="flex-center h-screen">
      <h1 className="h1 dark:!text-white">Storage Manager</h1>
    </div>
  );
}
