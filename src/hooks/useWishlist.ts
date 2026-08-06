import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseWishlistReturn {
  wishlist: string[];
  isLoading: boolean;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
}

export function useWishlist(): UseWishlistReturn {
  const queryClient = useQueryClient();

  const { data: wishlist = [], isPending: isLoading } = useQuery<string[]>({
    queryKey: ["wishlist"],
    queryFn: () => fetch("/api/wishlist").then((r) => r.json()),
  });

  const addMutation = useMutation({
    mutationFn: (productId: string) =>
      fetch("/api/wishlist/" + productId, { method: "POST" }).then((r) =>
        r.json(),
      ),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<string[]>(["wishlist"]);
      queryClient.setQueryData<string[]>(["wishlist"], (old) => [
        ...(old ?? []),
        productId,
      ]);

      return { previous };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["wishlist"], context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      fetch("/api/wishlist/" + productId, { method: "DELETE" }),
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: ["wishlist"] });
      const previous = queryClient.getQueryData<string[]>(["wishlist"]);
      queryClient.setQueryData<string[]>(["wishlist"], (old) =>
        (old ?? []).filter((id) => id !== productId),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["wishlist"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const toggleWishlist = (productId: string) => {
    if (isWishlisted(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return { wishlist, isLoading, isWishlisted, toggleWishlist };
}
