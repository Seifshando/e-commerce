// المنتج الأساسي
export interface Category {
  _id?: string;
  name: string;
}

export interface ProductDetails {
  id: string; // mapped from _id
  title: string;
  description: string;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
}

// prop للكومبوننت SingleProductDetails
export interface SingleProductDetailsProps {
  myData: ProductDetails;
}

// نوع المنتجات في القائمة (related)
export interface productType {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
}

// prop للكومبوننت SingleProduct
export interface SingleProductProps {
  currentProduct: productType;
}

// Checkout form type
export interface checkOutSchemaType {
  details: string;
  phone: string;
  city: string;
}
