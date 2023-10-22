export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export interface ProvinceProps {
  id: string;
  name: string;
  image: string;
  region_name: string;
  territory_name: string;
}

export interface PlaceProps {
  id: string;
  name: string;
  image: string;
  region_name: string;
  territory_name: string;
  province_name: string;
  image_stock: string;
}
