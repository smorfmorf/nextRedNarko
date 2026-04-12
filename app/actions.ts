'use server';

import { CheckoutFormValues } from "./(checkout)/checkout/page";



export async function createOrder(data: CheckoutFormValues) {
    console.log('data: ', data);

}