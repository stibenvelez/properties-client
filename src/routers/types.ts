import { ComponentType } from "react";

export interface LocationStates {
    "/"?: {};
    "/#"?: {};
    "/home-2"?: {};
    "/home-1-header-2"?: {};
    //
    "/listing-flights"?: {};
    //
    "/listing-stay"?: {};
    "/listing-stay-map"?: {};
    "/listing-stay-detail"?: {};
    //
    "/listing-experiences"?: {};
    "/listing-experiences-map"?: {};
    "/listing-experiences-detail"?: {};
    //
    "/listing-real-estate"?: {};
    "/listing-real-estate-map"?: {};
    "/listing-real-estate-detail"?: {};
    //
    "/listing-car"?: {};
    "/listing-car-map"?: {};
    "/listing-car-detail"?: {};
    //
    "/checkout"?: {};
    "/pay-done"?: {};
    //
    "/account"?: {};
    "/account-savelists"?: {};
    "/account-password"?: {};
    "/account-billing"?: {};

    "/author"?: {};
    "/search"?: {};
    "/about"?: {};
    "/contact"?: {};
    "/login"?: {};
    "/signup"?: {};
    "/forgot-pass"?: {};
    "/page404"?: {};
    "/subscription"?: {};
    //
    "/arriendo"?: {};
    "/venta"?: {};
    "/property/:id"?: {};
    "/admin"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
