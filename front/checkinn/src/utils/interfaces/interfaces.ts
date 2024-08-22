export interface IRoom {
  name: string;
  description: string;
  beds: number;
  baths: number;
  photos: string;
  capacity: number;
  price: number;
}

export interface IimgVIP {
  img1: string;
  img2: string;
  img3: string;
  img4: string;
}

export interface IDescriptionVIP {
  name: string | any;
  description: string;
  beds: number;
  baths: number;
  photos: string;
  capacity: number;
  price: number;
}

export interface IDataVIP {
  imgVIP: IimgVIP;
  descriptionVIP: IDescriptionVIP;
}
