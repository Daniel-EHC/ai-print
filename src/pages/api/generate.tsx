import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

type ErrorResponse = {
    message: string;
}

type ResponseData = {
    url: string | undefined;
}

type GenerateRequest = NextApiRequest & {
    body: {
        prompt: string;
        n: number;
        size: string;
    }
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function handler(
    req: GenerateRequest,
    res: NextApiResponse<ResponseData | ErrorResponse>
) {
    const promptString = req.body.prompt;
    if (!promptString) {
        return res.status(400).json({ message: 'No prompt provided' });

    }

    const aiResponse = await openai.createImage({
        prompt: `${promptString}`,
        n: 1,
        size: "512x512"
    });

   const imageUrl = aiResponse.data.data[0].url;
   res.status(200).json({ url: imageUrl });
}
