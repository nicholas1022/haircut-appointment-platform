import { NextFunction, Request, Response } from 'express';
import CustomerService from "../services/customer.service";

class CustomerController {
  private readonly customerService;

  constructor(customerService: CustomerService) {
    this.customerService = customerService;
  }

  public getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer = await this.customerService.getCustomer(req.params?.id);
      res.status(200).send(customer);
    } catch (err) {
      next(err);
    }
  }

  public getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customers = await this.customerService.getAllCustomers();
      res.status(200).send(customers);
    } catch (err) {
      next(err);
    }
  }

  public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateCustomer = await this.customerService.updateCustomer(req.params?.id, req.body);
      res.status(200).send(updateCustomer);
    } catch (err) {
      next(err);
    }
  }

  public deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.customerService.deleteCustomer(req.params?.id);
      res.status(200).send("Deleted successfully");
    } catch (err) {
      next(err);
    }
  }

  public signUpCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCustomer = await this.customerService.signUpCustomer(req.body);
      res.status(200).send(newCustomer);
    } catch (err) {
      next(err);
    }
  };
}

export default CustomerController;