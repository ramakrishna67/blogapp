"use client";

import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const deletePost = trpc.post.delete.useMutation({
    onSuccess: () => {
      alert("Blog deleted successfully!");
      router.push("/blog");
    },
  });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await deletePost.mutateAsync({ id });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 rounded-2xl px-3 py-1 text-white font-bold cursor-pointer hover:bg-red-700"
    >
      {deletePost.isPending ? "Deleting..." : "Delete Blog"}
    </button>
  );
}
