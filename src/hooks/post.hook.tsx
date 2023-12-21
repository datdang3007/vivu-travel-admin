import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ImageCell,
  PostActionCell,
  StatusCell,
  TextCell,
} from "src/components/Cell";
import { PROCESS_ENV } from "src/constants/env";
import { PostStatus } from "src/constants/post_status";
import { useMasterContext } from "src/context/MasterContext";
import { IPost } from "src/interfaces/post.interface";
import { showAlertSuccess } from "src/utils/alert";
import { useCallAPIUpdate, useCallApi } from "./common.hook";
import { useLoadingContext } from "src/provider/loading.provider";

export const usePostListHook = () => {
  const { user } = useMasterContext();
  const { requestUpdatePost } = useCallAPIUpdate();
  const { postList, refetchPostList, loadingPostList } = useCallApi();
  const [postData, setPostData] = useState<IPost[]>([]);
  const { setIsLoading } = useLoadingContext();

  const handleActionView = useCallback((id: string) => {
    window.open(`${PROCESS_ENV.USER_PAGE_URL}/post-detail/${id}`, "_blank");
  }, []);

  // Event approve post:
  const handleActionApproved = useCallback(
    (id: string) => {
      if (!user) return;
      const dataApproved = {
        id,
        data: {
          censor: user.email,
          status: PostStatus.Approved,
        },
      };
      requestUpdatePost(dataApproved).then(() => {
        showAlertSuccess(
          "Duyệt bài thành công",
          "đã cập nhật trạng thái bài viết mới!"
        );
        refetchPostList();
      });
    },
    [refetchPostList, requestUpdatePost, user]
  );

  // Event reject post:
  const handleActionRejected = useCallback(
    (id: string) => {
      if (!user) return;
      const dataRejected = {
        id,
        data: {
          censor: user.email,
          status: PostStatus.Rejected,
        },
      };
      requestUpdatePost(dataRejected).then(() => {
        showAlertSuccess(
          "Từ chối thành công",
          "đã cập nhật trạng thái bài viết mới!"
        );
        refetchPostList();
      });
    },
    [refetchPostList, requestUpdatePost, user]
  );

  const columns = useMemo(
    () => [
      {
        id: "image",
        header: "",
        accessorKey: "image",
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
        Cell: ImageCell,
        maxSize: 120,
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Tiêu Đề",
        Cell: TextCell({}),
      },
      {
        id: "creator",
        accessorKey: "creator.username",
        header: "Người Gửi",
        Cell: TextCell({}),
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Trạng thái",
        Cell: StatusCell({}),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: PostActionCell({
          onView: handleActionView,
          onApproved: handleActionApproved,
          onRejected: handleActionRejected,
        }),
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
      },
    ],
    [handleActionApproved, handleActionRejected, handleActionView]
  );

  useEffect(() => {
    setPostData(postList);
  }, [postList]);

  useEffect(() => {
    setIsLoading(loadingPostList);
  }, [loadingPostList, setIsLoading]);

  return { postData, columns };
};
