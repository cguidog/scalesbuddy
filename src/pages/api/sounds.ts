import { Request, Response } from 'express';
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import { FretY, FretX, Sounds, SoundsQuery } from '../../types/types'

export default function handler(req: Request<{}, {}, {}, SoundsQuery>, res: Response): void {
  let sounds: Sounds | {} = {};
  const keyPairId: string | undefined = process.env.CLOUDFRONT_KEY_PAIR_ID;
  const privateKey: string | undefined = process.env.CLOUDFRONT_PRIVATE_KEY;
  const data = req.query;
  const { notePositions, instrument }: SoundsQuery = data;

  if (notePositions && instrument && keyPairId && privateKey) {
    let soundUrls: string[] = []; 
    const position: [FretX, FretY][] = JSON.parse(notePositions);
    position.map(async (note)=> {
      const url: string =  getSignedUrl({
        url: `https://d14da8yxwe6gcc.cloudfront.net/${instrument}/${note[0]}_${note[1]}.mp3`,
        dateLessThan: new Date(Date.now() + 60 * 60 * 1000).toString(),
        keyPairId: keyPairId,
        privateKey: privateKey,
      });
      soundUrls.push(url);
    });
    sounds = {soundUrls};
  }
  res.status(200).json(sounds);
}