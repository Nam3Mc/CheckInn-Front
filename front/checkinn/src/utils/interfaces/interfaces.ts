export interface Register {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: number;
}

export interface Login {
  name: string;
  email: string;
  password: string;
  phone: number /* de momento para que llegue a al back, se debe completar este campo antes de auth 0 con firebase */;
}
export interface IRoom {
  id: string;
  name: string;
  description: string;
  beds: number;
  baths: number;
  photos: string;
  capacity: number;
  price: number;
  status: string;
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

export interface ICategorieData {
  name: string;
  description: string;
  img: string;
}
