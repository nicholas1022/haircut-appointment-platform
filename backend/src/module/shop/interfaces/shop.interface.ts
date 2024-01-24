import { Types } from "mongoose";

interface Shop {
  id?: Types.ObjectId,
  name: string;
  address: string;
}

export default Shop;
