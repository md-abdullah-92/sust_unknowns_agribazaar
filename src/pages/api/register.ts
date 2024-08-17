// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    // 0VB1
  const method = req.method;
    switch(method)
    {
        case 'POST':
        const {username,email,password,role} = (req.body) ;
        const user = {
            name:username,
            email:email,
            password:password,
            role:role
        }
        const url = "http://localhost:8080/api/user";
        try{
            const axiosRes = await axios.post(url,user,{
                headers: {
                    "Content-Type": "application/json",
                    }
            });
            const id = axiosRes.data as string;
            res.status(201).json({
                "message":"User created successfully",
                "id":id
            });
        }
        catch(err){
            console.log(err)
            res.status(500).end();
        }
        
            break;
        
        default:
         res.status(405).end();
        break;
    }
}
