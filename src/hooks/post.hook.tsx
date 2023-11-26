import { useCallback, useEffect, useMemo, useState } from "react";
import { ImageCell, TextCell } from "src/components/Cell";
import { PostActionCell } from "src/components/Cell";
import { IPost } from "src/interfaces/post.interface";
import { useCallAPIUpdate, useCallApi } from "./common.hook";
import { useMasterContext } from "src/context/MasterContext";
import { PostStatus } from "src/constants/post_status";
import { showAlertSuccess } from "src/utils/alert";

export const usePostListHook = () => {
  const { user } = useMasterContext();
  const { requestUpdatePost } = useCallAPIUpdate();
  const { postList, refetchPostList } = useCallApi();
  const [postData, setPostData] = useState<IPost[]>([]);

  const handleActionView = useCallback((id: string) => {}, []);

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
        id: "button",
        header: "Thao Tác",
        Cell: PostActionCell({
          onApproved: handleActionApproved,
          onRejected: handleActionRejected,
        }),
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
      },
    ],
    [handleActionApproved, handleActionRejected]
  );

  useEffect(() => {
    setPostData(postList);
  }, [postList]);

  return { postData, columns };
};
