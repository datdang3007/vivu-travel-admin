import { MenuItem } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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
import { getTerritoryList } from "src/apis/territory.api";

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
  const { data: regionList = [] } = useQuery(["getRegionList"], getRegionList);

  const { data: territoryList = [], refetch: refetchRegionList } = useQuery(
    ["getTerritoryList"],
    getTerritoryList
  );

  const { data: provinceList = [], refetch: refetchProvinceList } = useQuery(
    ["getProvinceList"],
    getProvinceList
  );

  return {
    regionList,
    territoryList,
    provinceList,
    refetchProvinceList,
    refetchRegionList,
  };
};

// Hook call API find:
export function useCallAPIFind() {
  // Region
  const { mutateAsync: requestFindRegionByID, isLoading: loadingFindRegion } =
    useMutation({
      mutationFn: findRegionByID,
    });

  // Province
  const {
    mutateAsync: requestFindProvinceByID,
    isLoading: loadingFindProvince,
  } = useMutation({
    mutationFn: findProvinceByID,
  });

  return {
    requestFindProvinceByID,
    loadingFindProvince,
    requestFindRegionByID,
    loadingFindRegion,
  };
}

// Hook call API create:
export const useCallAPICreate = () => {
  // Region
  const { mutateAsync: requestCreateRegion, isLoading: loadingCreateRegion } =
    useMutation({
      mutationFn: createRegion,
    });

  // Province
  const {
    mutateAsync: requestCreateProvince,
    isLoading: loadingCreateProvince,
  } = useMutation({
    mutationFn: createProvince,
  });

  return {
    requestCreateProvince,
    loadingCreateProvince,
    requestCreateRegion,
    loadingCreateRegion,
  };
};

// Hook call API update:
export const useCallAPIUpdate = () => {
  // Region
  const { mutateAsync: requestUpdateRegion, isLoading: loadingUpdateRegion } =
    useMutation({
      mutationFn: updateRegion,
    });

  // Province
  const {
    mutateAsync: requestUpdateProvince,
    isLoading: loadingUpdateProvince,
  } = useMutation({
    mutationFn: updateProvince,
  });

  return {
    requestUpdateProvince,
    loadingUpdateProvince,
    requestUpdateRegion,
    loadingUpdateRegion,
  };
};

// Hook call API delete:
export const useCallAPIDelete = () => {
  // Region
  const { mutateAsync: requestDeleteRegion, isLoading: loadingDeleteRegion } =
    useMutation({
      mutationFn: deleteRegion,
    });

  // Province
  const {
    mutateAsync: requestDeleteProvince,
    isLoading: loadingDeleteProvince,
  } = useMutation({
    mutationFn: deleteProvince,
  });

  return {
    requestDeleteProvince,
    loadingDeleteProvince,
    requestDeleteRegion,
    loadingDeleteRegion,
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

  // Function render select field:
  const SelectField = useCallback(() => {
    const convertOptions = [...options];
    return convertOptions.map((val) => (
      <MenuItem key={val.value} value={val.value}>
        {val.label}
      </MenuItem>
    ));
  }, [options]);

  return { options, SelectField };
};
