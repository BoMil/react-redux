class Rating {
    rate: number;
    count: number;
  
    constructor(data: any) {
      this.rate = data?.rate ?? 0;
      this.count = data?.count ?? 0;
    }
}

 export class Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    cartQuantity: number;
  
    constructor(data: any) {
      this.id = data?.id ?? 0;
      this.title = data?.title ?? '';
      this.price = data?.price ?? 0;
      this.description = data?.description ?? '';
      this.category = data?.category ?? '';
      this.image = data?.image ?? '';
      this.rating = new Rating(data?.rating);
      this.cartQuantity = data?.cartQuantity ?? 1;
    }
}
