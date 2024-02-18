import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { db } from '../../../firebase'; // Adjust the import path as necessary



// Initialize Stripe with TypeScript
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {

});

// Define the Firestore collection

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber, message, docId } = req.body;

    
    try {
      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Encouraging Message',
              description: 'Send a loving message to your college student',
            },
            unit_amount: 159, // Example price in cents
          },
          quantity: 1,
        }],
        metadata: { phoneNumber, message, docId },
        mode: 'payment',
        success_url: 'https://campuscards.com.co/success', //campuscards.com/success
        cancel_url: 'https://campuscards.com.co/cancel', //campuscards.com/cancel
      });

      res.status(200).json({ id: session.id });
    } catch (err: unknown) {
      if(err instanceof Error){ 
        console.error(err);
        res.status(500).json({ statusCode: 500, message: err.message });
      } else{
        console.error('An unexpected error occurred')
        res.status(500).json({ statusCode: 500, message: 'An unexpected error occured'});
      }  
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}