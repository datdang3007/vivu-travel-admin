import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { IPlaceImageStock } from "src/interfaces";
import { FormTitleCheckBoxProps, ItemImageListProps } from "src/types";
import { showAlertError, showAlertSuccess } from "src/utils/alert";
import {
  CheckIsImageUrl,
  GetIdParams,
  UploadFileToDiscordWebhook,
} from "src/utils/common";
import {
  useCallAPICreate,
  useCallAPIDelete,
  useCallAPIFind,
} from "./common.hook";

export const usePlaceImageStockHook = () => {
  const location = useLocation();
  const placeID = GetIdParams(location.pathname);
  const { requestCreatePlaceImage } = useCallAPICreate();
  const { requestDeletePlaceImage } = useCallAPIDelete();
  const { requestFindPlaceImageStockByPlaceID, requestFindPlaceByID } =
    useCallAPIFind();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openDialogSelectImage, setOpenDialogSelectImage] =
    useState<boolean>(false);
  const fileInputLinkRef = useRef<HTMLInputElement | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [imageList, setImageList] = useState<ItemImageListProps[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<FormTitleCheckBoxProps>({
    defaultValues: {
      formTitleCheckBoxValue: false,
    },
  });

  // Toggle dialog select image:
  const handleOpenDialogSelectImage = useCallback(() => {
    setOpenDialogSelectImage(true);
    setTimeout(() => {
      if (fileInputLinkRef.current) fileInputLinkRef.current.focus();
    }, 100);
  }, []);
  const handleCloseDialogSelectImage = useCallback(() => {
    setOpenDialogSelectImage(false);
  }, []);

  // Handle call API get place name:
  const handleSetPlaceName = useCallback(
    (id: string) => {
      requestFindPlaceByID(id).then((place) => {
        setPlaceName(place.name);
      });
    },
    [requestFindPlaceByID]
  );

  // Handle load image stock:
  const handleGetImageStock = useCallback(
    (id: string | number) => {
      requestFindPlaceImageStockByPlaceID(id).then((data) => {
        const convertData = data.map((val: IPlaceImageStock) => {
          const { id, link } = val;
          return {
            id,
            link,
            active: false,
          };
        });
        setImageList(convertData);
      });
    },
    [requestFindPlaceImageStockByPlaceID]
  );

  const getListLinkURL = useCallback(
    async (listFile: any) => {
      const uploadPromises = [];
      try {
        let countFile = 0;
        const listData: any[] = [];
        for (const file of listFile) {
          countFile++;
          const uploadPromise = UploadFileToDiscordWebhook(file)
            .then((linkUrl) => {
              if (linkUrl) {
                const dataCreate = {
                  link: linkUrl,
                  place: { id: Number(placeID) },
                };
                listData.push(dataCreate);
              }
            })
            .catch((error) => {
              console.error("Error uploading file", error);
            });

          uploadPromises.push(uploadPromise);
        }

        await Promise.all(uploadPromises);

        if (listData.length === countFile) {
          return listData;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    },
    [placeID]
  );

  // Handle event create image:
  const handleCreateImage = useCallback(
    async (listFile: any) => {
      getListLinkURL(listFile)
        .then((result) => {
          if (!result) {
            return showAlertError(
              "Lỗi !",
              "Có lỗi xảy ra trong quá trình xử lý liên kết."
            );
          }
          requestCreatePlaceImage(result as IPlaceImageStock[]).then(() => {
            showAlertSuccess("Thêm thành công", "Đã thêm hình ảnh thành công!");
            handleGetImageStock(placeID);
          });
        })
        .catch((error) => {
          showAlertError(
            "Lỗi !",
            `Lỗi xảy ra khi kiểm tra liên kết hình ảnh: ${error}`
          );
        });
    },
    [getListLinkURL, handleGetImageStock, placeID, requestCreatePlaceImage]
  );

  // Handle event delete list image:
  const handleDeleteImage = useCallback(async () => {
    const listID: number[] = imageList
      .filter((val) => val.active)
      .map((image) => Number(image.id));
    if (listID.length === 0) {
      return showAlertError("Lỗi !", "Chưa có ảnh nào được chọn");
    }
    requestDeletePlaceImage(listID).then((res) => {
      console.log(res);
      showAlertSuccess("Xóa thành công", "Đã xóa hình ảnh thành công!");
      handleGetImageStock(placeID);
    });
  }, [handleGetImageStock, imageList, placeID, requestDeletePlaceImage]);

  const resetImageActive = useCallback(() => {
    const newData = imageList.map((val) => {
      val.active = false;
      return val;
    }, []);
    setImageList(newData);
  }, [imageList]);

  const onClickSubmitLink = useCallback(async () => {
    if (!fileInputLinkRef.current) return;
    const imageUrl = fileInputLinkRef.current.value;
    CheckIsImageUrl(imageUrl)
      .then((isImage) => {
        if (!isImage) {
          return showAlertError(
            "Lỗi !",
            "Link ảnh không hợp lệ, vui lòng kiểm tra lại"
          );
        }
        setOpenDialogSelectImage(false);
        const dataCreate = [
          {
            link: imageUrl,
            place: { id: Number(placeID) },
          },
        ];
        requestCreatePlaceImage(dataCreate as IPlaceImageStock[]).then(() => {
          showAlertSuccess("Thêm thành công", "Đã thêm hình ảnh thành công!");
          handleGetImageStock(placeID);
        });
      })
      .catch((error) => {
        showAlertError(
          "Lỗi !",
          `Lỗi xảy ra khi kiểm tra liên kết hình ảnh: ${error}`
        );
      });
  }, [handleGetImageStock, placeID, requestCreatePlaceImage]);

  const handleToggleEditMode = useCallback(() => {
    setIsEditMode((pre) => {
      if (pre) {
        resetImageActive();
      }
      return !pre;
    });
  }, [resetImageActive]);

  const onCloseDialogPreview = useCallback(() => {
    setImagePreview(null);
  }, []);

  const onImageClick = useCallback(
    (id: string | number, image: string) => {
      if (!isEditMode) {
        setImagePreview(image);
        return;
      }
      const curData = [...imageList];
      const data = curData.map((val) => {
        if (val.id === id) {
          val.active = !val.active;
        }
        return val;
      });
      setImageList(data);
    },
    [imageList, isEditMode]
  );

  useEffect(() => {
    handleGetImageStock(placeID);
  }, [handleGetImageStock, placeID]);

  useEffect(() => {
    handleSetPlaceName(placeID);
  }, [handleSetPlaceName, placeID]);

  return {
    imageList,
    placeName,
    methods,
    isEditMode,
    imagePreview,
    openDialogSelectImage,
    fileInputLinkRef,
    handleOpenDialogSelectImage,
    handleCloseDialogSelectImage,
    onClickSubmitLink,
    handleCreateImage,
    handleToggleEditMode,
    handleDeleteImage,
    onCloseDialogPreview,
    onImageClick,
  };
};
