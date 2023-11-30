import { MenuItem } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { authLogin, checkExistEmail, getUserProfile } from "src/apis/auth.api";
import {
  getPlaceCategoryList,
  updatePlaceCategory,
} from "src/apis/place-category.api";
import {
  createPlaceImage,
  deletePlaceImage,
  findPlaceImageByPlaceID,
} from "src/apis/place-image-stock.api";
import {
  createPlace,
  deletePlace,
  findPlaceByID,
  getPlaceList,
} from "src/apis/place.api";
import { getPostList, updatePost } from "src/apis/post.api.";
import {
  createProvince,
  deleteProvince,
  findProvinceByID,
  getProvinceList,
  updateProvince,
} from "src/apis/province.api";
import {
  createRegion,
  deleteRegion,
  findRegionByID,
  getRegionList,
  updateRegion,
} from "src/apis/region.api";
import {
  createTerritory,
  deleteTerritory,
  findTerritoryByID,
  getTerritoryList,
  updateTerritory,
} from "src/apis/territory.api";
import { getUserByRoles } from "src/apis/user.api";
import { LOCAL_STORAGE } from "src/constants/local_storage";
import { useMasterContext } from "src/context/MasterContext";
import { PATH } from "src/routes/path";
import { showAlertError } from "src/utils/alert";

// Hook call API auth:
export const useCallAPIAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useMasterContext();

  const {
    mutateAsync: requestCheckExistEmail,
    isLoading: loadingForCheckExistEmail,
  } = useMutation({
    mutationFn: checkExistEmail,
  });

  const {
    mutateAsync: requestGetUserProfile,
    isLoading: loadingForGetUserProfile,
  } = useMutation({
    mutationFn: getUserProfile,
    onSuccess: (data) => {
      setUser(data);
      if (data) {
        const { role } = data;
        localStorage.setItem(LOCAL_STORAGE.UserRole, role.toString());
      }
    },
    onError: (error) => {
      console.error(error);
      setUser(null);
    },
  });

  const { mutateAsync: requestLogin, isLoading: loadingForLogin } = useMutation(
    {
      mutationFn: authLogin,
      onSuccess: (res) => {
        const { access_token } = res;
        localStorage.setItem(LOCAL_STORAGE.AccessToken, access_token);
        requestGetUserProfile().then((data) => {
          if (data) {
            navigate(PATH.STATISTICS);
          }
        });
      },
      onError: (error) => {
        console.error(error);
        showAlertError("Lỗi !", "Email hoặc mật khẩu không đúng");
      },
    }
  );

  return {
    requestLogin,
    loadingForLogin,
    requestCheckExistEmail,
    loadingForCheckExistEmail,
    requestGetUserProfile,
    loadingForGetUserProfile,
  };
};

// Hook navigate to CRUD page entity:
export const useNavigateCRUD = (url: string) => {
  const navigate = useNavigate();

  const PageList = useCallback(() => {
    navigate(url);
  }, [navigate, url]);

  const PageEdit = useCallback(
    (id: string) => {
      navigate(`${url}/edit/${id}`);
    },
    [navigate, url]
  );

  const PageCreate = useCallback(() => {
    navigate(`${url}/create`);
  }, [navigate, url]);

  return { PageList, PageEdit, PageCreate };
};

// Hook call API list:
export const useCallApi = () => {
  // Region
  const { data: regionList = [], refetch: refetchRegionList } = useQuery(
    ["getRegionList"],
    getRegionList
  );

  // Territory
  const { data: territoryList = [], refetch: refetchTerritoryList } = useQuery(
    ["getTerritoryList"],
    getTerritoryList
  );

  // Province
  const { data: provinceList = [], refetch: refetchProvinceList } = useQuery(
    ["getProvinceList"],
    getProvinceList
  );

  // Place
  const { data: placeList = [], refetch: refetchPlaceList } = useQuery(
    ["getPlaceList"],
    getPlaceList
  );

  // Place Category
  const { data: placeCategoryList = [], refetch: refetchPlaceCategoryList } =
    useQuery(["getPlaceCategoryList"], getPlaceCategoryList);

  // Place
  const { data: postList = [], refetch: refetchPostList } = useQuery(
    ["getPostList"],
    getPostList
  );

  return {
    regionList,
    refetchRegionList,
    territoryList,
    refetchTerritoryList,
    provinceList,
    refetchProvinceList,
    placeList,
    refetchPlaceList,
    placeCategoryList,
    refetchPlaceCategoryList,
    postList,
    refetchPostList,
  };
};

// Hook call API find:
export function useCallAPIFind() {
  // Region
  const { mutateAsync: requestFindRegionByID, isLoading: loadingFindRegion } =
    useMutation({
      mutationFn: findRegionByID,
    });

  // Territory
  const {
    mutateAsync: requestFindTerritoryByID,
    isLoading: loadingFindTerritory,
  } = useMutation({
    mutationFn: findTerritoryByID,
  });

  // Province
  const {
    mutateAsync: requestFindProvinceByID,
    isLoading: loadingFindProvince,
  } = useMutation({
    mutationFn: findProvinceByID,
  });

  // Place
  const { mutateAsync: requestFindPlaceByID, isLoading: loadingFindPlace } =
    useMutation({
      mutationFn: findPlaceByID,
    });

  // Place Image
  const {
    mutateAsync: requestFindPlaceImageStockByPlaceID,
    isLoading: loadingFindPlaceImageStockByPlaceID,
  } = useMutation({
    mutationFn: findPlaceImageByPlaceID,
  });

  // User
  const {
    mutateAsync: requestFindUserByRoles,
    isLoading: loadingFindUserByRoles,
  } = useMutation({
    mutationFn: getUserByRoles,
  });

  return {
    requestFindProvinceByID,
    loadingFindProvince,
    requestFindRegionByID,
    loadingFindRegion,
    requestFindTerritoryByID,
    loadingFindTerritory,
    requestFindPlaceByID,
    loadingFindPlace,
    requestFindPlaceImageStockByPlaceID,
    loadingFindPlaceImageStockByPlaceID,
    requestFindUserByRoles,
    loadingFindUserByRoles,
  };
}

// Hook call API create:
export const useCallAPICreate = () => {
  // Region
  const { mutateAsync: requestCreateRegion, isLoading: loadingCreateRegion } =
    useMutation({
      mutationFn: createRegion,
    });

  // Territory
  const {
    mutateAsync: requestCreateTerritory,
    isLoading: loadingCreateTerritory,
  } = useMutation({
    mutationFn: createTerritory,
  });

  // Province
  const {
    mutateAsync: requestCreateProvince,
    isLoading: loadingCreateProvince,
  } = useMutation({
    mutationFn: createProvince,
  });

  // Place
  const { mutateAsync: requestCreatePlace, isLoading: loadingCreatePlace } =
    useMutation({
      mutationFn: createPlace,
    });

  // Place Image Stock
  const {
    mutateAsync: requestCreatePlaceImage,
    isLoading: loadingCreatePlaceImage,
  } = useMutation({
    mutationFn: createPlaceImage,
  });

  return {
    requestCreateProvince,
    loadingCreateProvince,
    requestCreateRegion,
    loadingCreateRegion,
    requestCreateTerritory,
    loadingCreateTerritory,
    requestCreatePlace,
    loadingCreatePlace,
    requestCreatePlaceImage,
    loadingCreatePlaceImage,
  };
};

// Hook call API update:
export const useCallAPIUpdate = () => {
  // Region
  const { mutateAsync: requestUpdateRegion, isLoading: loadingUpdateRegion } =
    useMutation({
      mutationFn: updateRegion,
    });

  // Territory
  const {
    mutateAsync: requestUpdateTerritory,
    isLoading: loadingUpdateTerritory,
  } = useMutation({
    mutationFn: updateTerritory,
  });

  // Province
  const {
    mutateAsync: requestUpdateProvince,
    isLoading: loadingUpdateProvince,
  } = useMutation({
    mutationFn: updateProvince,
  });

  // Place Category
  const {
    mutateAsync: requestUpdatePlaceCategory,
    isLoading: loadingUpdatePlaceCategory,
  } = useMutation({
    mutationFn: updatePlaceCategory,
  });

  // Post
  const { mutateAsync: requestUpdatePost, isLoading: loadingUpdatePost } =
    useMutation({
      mutationFn: updatePost,
    });

  return {
    requestUpdateProvince,
    loadingUpdateProvince,
    requestUpdateRegion,
    loadingUpdateRegion,
    requestUpdateTerritory,
    loadingUpdateTerritory,
    requestUpdatePlaceCategory,
    loadingUpdatePlaceCategory,
    requestUpdatePost,
    loadingUpdatePost,
  };
};

// Hook call API delete:
export const useCallAPIDelete = () => {
  // Region
  const { mutateAsync: requestDeleteRegion, isLoading: loadingDeleteRegion } =
    useMutation({
      mutationFn: deleteRegion,
    });

  // Territory
  const {
    mutateAsync: requestDeleteTerritory,
    isLoading: loadingDeleteTerritory,
  } = useMutation({
    mutationFn: deleteTerritory,
  });

  // Province
  const {
    mutateAsync: requestDeleteProvince,
    isLoading: loadingDeleteProvince,
  } = useMutation({
    mutationFn: deleteProvince,
  });

  // Place
  const { mutateAsync: requestDeletePlace, isLoading: loadingDeletePlace } =
    useMutation({
      mutationFn: deletePlace,
    });

  // Place Image
  const {
    mutateAsync: requestDeletePlaceImage,
    isLoading: loadingDeletePlaceImage,
  } = useMutation({
    mutationFn: deletePlaceImage,
  });

  return {
    requestDeleteProvince,
    loadingDeleteProvince,
    requestDeleteRegion,
    loadingDeleteRegion,
    requestDeleteTerritory,
    loadingDeleteTerritory,
    requestDeletePlace,
    loadingDeletePlace,
    requestDeletePlaceImage,
    loadingDeletePlaceImage,
  };
};

// Hook format select from API data:
export const useSelectHook = (data: any[], value?: string, label?: string) => {
  const optionValue = useMemo(() => {
    return value ?? "id";
  }, [value]);

  const optionLabel = useMemo(() => {
    return label ?? "name";
  }, [label]);

  const options = data.map((val) => ({
    value: val[optionValue],
    label: val[optionLabel],
  }));

  const autocompleteOptions = data.map((val) => ({
    id: val[optionValue],
    label: val[optionLabel],
  }));

  // Function render select field:
  const SelectField = useCallback(() => {
    const convertOptions = [...options];
    return convertOptions.map((val) => (
      <MenuItem key={val.value} value={val.value}>
        {val.label}
      </MenuItem>
    ));
  }, [options]);

  return { options, autocompleteOptions, SelectField };
};
