import { NextFunction, Response } from 'express';
import BookingService from "../service/booking.service";
import { AuthRequest } from "../../../middleware/verify-firebase-token";
import { Role } from "../../auth/enum/role.enum";
import AuthService from "../../auth/services/auth.service";
import { Date } from 'mongoose';

class BookingController {
  private readonly bookingService;
  private readonly authService;

  constructor(
    bookingService: BookingService,
    authService: AuthService,
  ) {
    this.bookingService = bookingService;
    this.authService = authService;
  }

  public getBookingsByCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.authService.verifyCustomer(req.authData?.role as Role);

      const bookings = await this.bookingService.getBookingsByCustomer(req.authData?.uid as string);
      res.status(200).send(bookings);
    } catch (err) {
      next(err);
    }
  }

  public getBookingsByStylist = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.authService.verifyStylist(req.authData?.role as Role);

      const bookings = await this.bookingService.getBookingsByStylist(req.authData?.uid as string);
      res.status(200).send(bookings);
    } catch (err) {
      next(err);
    }
  }

  public createBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // await this.authService.verifyCustomer(req.authData?.role as Role);

      // req.body.customerId = req.authData?.uid;
      const booking = await this.bookingService.createBooking(req.body);
      res.status(201).send(booking);
    } catch (err) {
      next(err);
    }
  }

  public cancelBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let booking;
      if (req.authData?.role === Role.CUSTOMER) {
        booking = await this.bookingService.cancelBooking(req?.params?.id, req.authData?.uid);
      } else if (req.authData?.role === Role.STYLIST) {
        booking = await this.bookingService.cancelBooking(req?.params?.id, undefined, req.authData?.uid);
      }

      res.status(200).send(booking);
    } catch (err) {
      next(err);
    }
  }

  public updateBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let booking;
      if (req.authData?.role === Role.CUSTOMER) {
        booking = await this.bookingService.updateBooking(req?.params?.id, req?.body, req.authData?.uid);
      } else if (req.authData?.role === Role.STYLIST) {
        booking = await this.bookingService.updateBooking(req?.params?.id, req?.body, undefined, req.authData?.uid);
      }

      res.status(200).send(booking);
    } catch (err) {
      next(err);
    }
  }

  public getBookingsByStylistTime = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.bookingService.getBookingsByStylistTime(req.params?.id as string, req.params?.startTime as string, req.params?.endTime as string);
      res.status(200).send(bookings);
    } catch (err) {
      next(err);
    }
  }
}

export default BookingController;