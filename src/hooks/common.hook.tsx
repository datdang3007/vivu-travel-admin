import { MenuItem } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getProvinceList } from "src/apis/province.api";
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

// Hook call API:
export const useCallApi = () => {
  const { data: regionList = [] } = useQuery(["getRegionList"], getRegionList);

  const { data: territoryList = [] } = useQuery(
    ["getTerritoryList"],
    getTerritoryList
  );

  const { data: provinceList = [] } = useQuery(
    ["getProvinceList"],
    getProvinceList
  );

  return { regionList, territoryList, provinceList };
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
    convertOptions.unshift({
      value: -1,
      label: "Vui lòng chọn",
    });
    return convertOptions.map((val) => (
      <MenuItem key={val.value} value={val.value}>
        {val.label}
      </MenuItem>
    ));
  }, [options]);

  return { options, SelectField };
};
