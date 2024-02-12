import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";
import { db } from '../../../firebase.js';
import { doc, updateDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.WEBHOOK_SECRET as string;

export const config = {
    api:{
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        console.log("req.headers", req.headers);
        if(req.method !== "POST")
            return res.status(405).send("only POST requests allowed");
        
        const sig: any = req.headers["stripe-signature"];
        const rawBody = await getRawBody(req);

        let event;

        try{
            event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
        }catch (err: any) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        console.log("event.type", JSON.stringify(event.type));
        if (event.type === "checkout.session.completed"){
            
            const session = event.data.object;
            const docId = session.metadata?.docId ?? null;
            
            if(docId){
                const docRef = doc(db, "messages", docId);
                
                await updateDoc(docRef, {
                    paymentStatus: true
                });
                console.log("Payment status updated for:", docId)
            }else{
                console.log("Document ID not found in metadata.")
            }

            res.status(200).json({ received: true });

        }
        res.status(200).end();
    } catch (error) { 
        console.error(error);
        res.status(500).json("Internal Server Error");   
    }
}