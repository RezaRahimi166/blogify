import { editPostApi } from "@/services/postServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditPost() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editPost } = useMutation({
    mutationFn: editPostApi,
    mutationKey: ["posts"],
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { isEditing, editPost };
}

export default useEditPost;
