import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ActionCell, ImageCell, LinkCell, TextCell } from "src/components/Cell";
import { CONTENT_TYPE } from "src/constants/content";
import { PATH } from "src/routes/path";
import { ContentDataProps } from "src/types";
import { showAlertConfirm, showAlertSuccess } from "src/utils/alert";
import { GetIdParams } from "src/utils/common";
import {
  useCallAPICreate,
  useCallAPIDelete,
  useCallAPIFind,
  useCallAPIUpdate,
  useCallApi,
  useNavigateCRUD,
  useSelectHook,
} from "./common.hook";

const url = PATH.PLACE;

// Hook for list page:
export const usePlaceListHook = () => {
  const { PageCreate, PageEdit } = useNavigateCRUD(url);
  const {
    placeList,
    refetchPlaceList,
    placeCategoryList,
    refetchPlaceCategoryList,
  } = useCallApi();
  const { requestDeletePlace } = useCallAPIDelete();
  const { requestUpdatePlaceCategory } = useCallAPIUpdate();
  const [placeData, setPlaceData] = useState<any[]>([]);
  const [placeCategoryData, setPlaceCategoryData] = useState<any[]>([]);
  const [currentPlaceCategoryData, setCurrentPlaceCategoryData] = useState<
    any[]
  >([...placeCategoryData]);
  const [openDialogPlaceCategory, setOpenDialogPlaceCategory] =
    useState<boolean>(false);

  // TOGGLE DIALOG PLACE CATEGORY:
  const handleOpenDialogPlaceCategory = useCallback(() => {
    setOpenDialogPlaceCategory(true);
  }, []);
  const handleCloseDialogPlaceCategory = useCallback(() => {
    setOpenDialogPlaceCategory(false);
  }, []);

  // EVENT WHEN CLICK BUTTON SAVE IN DIALOG PLACE CATEGORY:
  const handleUpdatePlaceCategory = useCallback(() => {
    const dataConvert = [...currentPlaceCategoryData];
    const dataNew = placeCategoryData.filter(
      (val) => typeof val.id === "string"
    );
    dataConvert.forEach((val) => {
      const dataExists = placeCategoryData.find((item) => item.id === val.id);
      if (dataExists) {
        val = dataExists;
      } else {
        val.delete = true;
      }
      return val;
    });
    const dataSubmit = [...dataConvert, ...dataNew];
    requestUpdatePlaceCategory(dataSubmit).then(() => {
      setOpenDialogPlaceCategory(false);
      showAlertSuccess(
        "Cập nhật thành công",
        "Đã cập nhật phân loại địa điểm mới!"
      );
      refetchPlaceCategoryList();
    });
  }, [
    currentPlaceCategoryData,
    placeCategoryData,
    refetchPlaceCategoryList,
    requestUpdatePlaceCategory,
  ]);

  // ACTION OPEN EDIT PAGE:
  const handleActionEdit = useCallback(
    (id: string) => {
      PageEdit(id);
    },
    [PageEdit]
  );

  // EVENT WHEN CLICK BUTTON DELETE:
  const handleActionDelete = useCallback(
    (id: string) => {
      showAlertConfirm(
        "Xác nhận",
        "Bạn có chắc muốn xóa không?",
        "Xóa",
        "Hủy"
      ).then((res) => {
        if (res.isConfirmed) {
          requestDeletePlace(id).then(() => {
            showAlertSuccess("Xóa thành công", "Đã xóa thành công!");
            refetchPlaceList();
          });
        }
      });
    },
    [refetchPlaceList, requestDeletePlace]
  );

  // SET UP COLUMN FIELD:
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
        id: "name",
        accessorKey: "name",
        header: "Tên",
        Cell: TextCell({ sx: { fontSize: "18px", fontWeight: "bold" } }),
      },
      {
        id: "region",
        accessorKey: "region.name",
        header: "Miền",
        Cell: TextCell({}),
      },
      {
        id: "territory",
        accessorKey: "territory.name",
        header: "Vùng",
        Cell: TextCell({}),
      },
      {
        id: "province",
        accessorKey: "province.name",
        header: "Tỉnh Thành",
        Cell: TextCell({}),
      },
      {
        id: "count_image_stock",
        accessorKey: "count_image_stock",
        header: "Kho Ảnh",
        Cell: LinkCell({
          link: `${PATH.IMAGE_STOCK}/place`,
          isNewPage: true,
        }),
      },
      {
        id: "button",
        header: "Thao Tác",
        Cell: ActionCell({
          onEdit: handleActionEdit,
          onDelete: handleActionDelete,
        }),
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
      },
    ],
    [handleActionDelete, handleActionEdit]
  );

  useEffect(() => {
    const dataPlaceList = [...placeList];
    const convertData = dataPlaceList.map((place) => {
      place.count_image_stock = place.image_stock?.length ?? 0;
      return place;
    });
    setPlaceData(convertData);
  }, [placeList]);

  useEffect(() => {
    const convertData = placeCategoryList.map(
      (val: any) => (val.selected = false)
    );
    setPlaceCategoryData(convertData);
    setCurrentPlaceCategoryData(placeCategoryList);
  }, [placeCategoryList]);

  return {
    placeData,
    columns,
    PageCreate,
    placeCategoryData,
    setPlaceCategoryData,
    openDialogPlaceCategory,
    currentPlaceCategoryData,
    handleUpdatePlaceCategory,
    handleOpenDialogPlaceCategory,
    handleCloseDialogPlaceCategory,
  };
};

// Data content Init:
const initContentData = [
  {
    id: 1,
    type: CONTENT_TYPE.IMAGE,
    content: "",
  },
  {
    id: 2,
    type: CONTENT_TYPE.TEXT,
    content: "",
  },
];

// Hook for create page:
export const usePlaceCreateHook = () => {
  const { provinceList, placeCategoryList } = useCallApi();
  const { PageList } = useNavigateCRUD(url);
  const { requestCreatePlace } = useCallAPICreate();
  const { SelectField: provinceOptionComponent } = useSelectHook(provinceList);
  const { autocompleteOptions: placeCategoryOptions } =
    useSelectHook(placeCategoryList);

  const formCreate = useForm({
    defaultValues: {
      category: [],
      province: "",
      contents: [...initContentData],
    },
  });
  const { handleSubmit, getValues } = formCreate;

  const [contentData, setContentData] = useState<ContentDataProps[]>(
    getValues("contents")
  );

  // Function update content data:
  const handleUpdateContentData = useCallback((data: ContentDataProps[]) => {
    setContentData(data);
  }, []);

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        const dataSubmit = { ...data, contents: contentData };
        requestCreatePlace(dataSubmit).then(() => {
          showAlertSuccess(
            "Tạo mới thành công",
            "đã tạo Địa Điểm mới thành công!"
          );
          setTimeout(() => PageList(), 2000);
        });
      },
      [PageList, contentData, requestCreatePlace]
    )
  );

  return {
    PageList,
    formCreate,
    contentData,
    onSubmit,
    placeCategoryOptions,
    handleUpdateContentData,
    provinceOptionComponent,
  };
};

// Hook for edit page:
export const usePlaceEditHook = () => {
  const location = useLocation();
  const placeID = GetIdParams(location.pathname);
  const { provinceList, placeCategoryList } = useCallApi();
  const { PageList } = useNavigateCRUD(url);
  const { requestFindPlaceByID } = useCallAPIFind();
  const { requestCreatePlace } = useCallAPICreate();
  const { SelectField: provinceOptionComponent } = useSelectHook(provinceList);
  const { autocompleteOptions: placeCategoryOptions } =
    useSelectHook(placeCategoryList);
  const [contentData, setContentData] = useState<ContentDataProps[]>([]);

  const formEdit = useForm({
    defaultValues: {
      category: [],
      province: "",
      contents: [],
    },
  });
  const { handleSubmit, reset } = formEdit;

  // Function update content data:
  const handleUpdateContentData = useCallback((data: ContentDataProps[]) => {
    setContentData(data);
  }, []);

  const onSubmit = handleSubmit(
    useCallback(
      (data: any) => {
        const dataSubmit = { ...data, contents: contentData };
        requestCreatePlace(dataSubmit).then(() => {
          showAlertSuccess(
            "Tạo mới thành công",
            "đã tạo Địa Điểm mới thành công!"
          );
          setTimeout(() => PageList(), 2000);
        });
      },
      [PageList, contentData, requestCreatePlace]
    )
  );

  useEffect(() => {
    requestFindPlaceByID(placeID).then((data) => {
      const convertContents = data?.contents?.map(
        (content: ContentDataProps, idx: number) => {
          return {
            id: idx,
            type: content.type,
            content: content.content,
          };
        }
      );
      const convertDataCategory = data?.category?.map((val: any) => {
        const result: {
          id: string | number;
          label: string;
        } = {
          id: val.id,
          label: val.name,
        };
        return result;
      }, []);
      const convertData = {
        ...data,
        contents: convertContents,
        province: data.province.id,
        category: convertDataCategory,
      };
      setContentData(convertContents);
      reset(convertData);
    });
  }, [placeID, requestFindPlaceByID, reset]);

  return {
    formEdit,
    PageList,
    onSubmit,
    contentData,
    placeCategoryOptions,
    handleUpdateContentData,
    provinceOptionComponent,
  };
};
