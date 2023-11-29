import { Client } from "@notionhq/client";
import { NOTION_DATABASE_ID, NOTION_SECRET } from "@src/contains/contants";

const notionRequest = new Client({
  auth: NOTION_SECRET,
})

export async function getListBooks(){
  const request = await notionRequest.databases.query({
    database_id: NOTION_DATABASE_ID
  })
  return request.results
}
