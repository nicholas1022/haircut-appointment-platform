import express from "express";
import CustomerController from "../controllers/customer.controller";

const initializeCustomerRouter = (customerController: CustomerController): express.Router => {
  const customerRouter = express.Router();

  customerRouter.get("/", customerController.getAllCustomers);
  customerRouter.get("/:id", customerController.getCustomer);
  customerRouter.post("/signup", customerController.signUpCustomer);
  customerRouter.put("/:id", customerController.updateCustomer);
  customerRouter.delete("/:id", customerController.deleteCustomer);

  return customerRouter;
}

export default initializeCustomerRouter;