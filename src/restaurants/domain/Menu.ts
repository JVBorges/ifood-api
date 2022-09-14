namespace Menu {
  type Product = {
    id: number;
    group_id: number;
    group_name: string;
    name: string;
    description: string;
    images: {
      small: string;
      medium: string;
      large: string;
    };
    min_price: number;
    prices: {
      code: string;
      name: string;
      price: number;
    }[]
  }

  type Group = {
    id: number;
    index: number;
    name: string;
    products: Product[];
  }

  export type Menu = {
    groups: Group[]
  }

  export type Type = Menu;
}