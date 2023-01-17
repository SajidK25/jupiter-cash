import {
  initializeApp,
  cert,
  getApps,
  type ServiceAccount,
  getApp,
} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccount: ServiceAccount = JSON.parse(
  process.env.SERVICE_ACCOUNT as string
);
let app;
try {
  app =
    getApps().length === 0
      ? initializeApp({
          credential: cert(serviceAccount),
          storageBucket: process.env.STORAGE_BUCKET,
        })
      : getApp();
} catch (error) {
  console.log("Failed to initialize App: " + error);
}

const bucket = getStorage().bucket();

// 'bucket' is an object defined in the @google-cloud/storage library.
// See https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket
// for more details.

export { bucket, app };
