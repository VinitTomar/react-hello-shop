import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProfile } from "@/store/userSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const { status, profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProfile());
  }, [status, dispatch]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Profile
      </h2>

      {status === "loading" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-6 animate-pulse">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
          <div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28 mt-2"></div>
          </div>
        </div>
      )}

      {status === "failed" && (
        <p className="text-sm text-red-500">Failed to load profile.</p>
      )}

      {status === "succeeded" && profile && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-6">
          <img
            src={profile.avatarUrl}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            alt={profile.name}
          />
          <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {profile.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {profile.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Member since{" "}
              {new Date(profile.joinedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
