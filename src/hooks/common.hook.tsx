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
import { getRegionList } from "src/apis/region.api";
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

  const { data: territoryList = [] } = useQuery(
    ["getTerritoryList"],
    getTerritoryList
  );

  const { data: provinceList = [], refetch: refetchProvinceList } = useQuery(
    ["getProvinceList"],
    getProvinceList
  );

  return { regionList, territoryList, provinceList, refetchProvinceList };
};

// Hook call API find:
export function useCallAPIFind() {
  const {
    mutateAsync: requestFindProvinceByID,
    isLoading: loadingFindProvince,
  } = useMutation({
    mutationFn: findProvinceByID,
  });

  return { requestFindProvinceByID, loadingFindProvince };
}

// Hook call API create:
export const useCallAPICreate = () => {
  const {
    mutateAsync: requestCreateProvince,
    isLoading: loadingCreateProvince,
  } = useMutation({
    mutationFn: createProvince,
  });

  return { requestCreateProvince, loadingCreateProvince };
};

// Hook call API update:
export const useCallAPIUpdate = () => {
  const {
    mutateAsync: requestUpdateProvince,
    isLoading: loadingUpdateProvince,
  } = useMutation({
    mutationFn: updateProvince,
  });

  return { requestUpdateProvince, loadingUpdateProvince };
};

// Hook call API delete:
export const useCallAPIDelete = () => {
  const {
    mutateAsync: requestDeleteProvince,
    isLoading: loadingDeleteProvince,
  } = useMutation({
    mutationFn: deleteProvince,
  });

  return { requestDeleteProvince, loadingDeleteProvince };
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
