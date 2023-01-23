// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAIApi } from "openai";
import { configuration } from "../../../utils/constants";

type Data = {
  result: string
  input: string;
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Usted es un experto en marketing y un cliente se acerca a usted para que le escribas una breve y emocionante copia de marketing. este es el tema del que les gustaría una copia de marketing'${input}.'\n\nEsta es la breve copia de marketing que se te ocurrió:`,
    temperature: 0.85,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) throw new Error("No suggestion found");

  res.status(200).json({ input, result: suggestion });
}
