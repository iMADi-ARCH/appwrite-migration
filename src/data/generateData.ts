import { AppwriteSchema, AppwriteData } from "@/types/index";
import { AppwriteMigrationClient } from "@/client";

/**
 * @abstract This method method collects the data from the provided schema file which is generated using `generateSchema()` method.
 * @param client
 * @param schema
 * @returns json data
 */
const generateData = async (
  client: AppwriteMigrationClient,
  schema: AppwriteSchema
) => {
  const data: AppwriteData = { documents: [], files: [] };

  for (const db of schema.databases) {
    for (const collection of schema.collections) {
      const docs = (
        await client.databases.listDocuments(db.$id, collection.$id)
      ).documents;
      data.documents.push(...docs);
    }
  }

  for (const bucket of schema.buckets) {
    data.files = (await client.storage.listFiles(bucket.$id)).files;
  }

  return data;
};

export default generateData;
