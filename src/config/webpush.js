import webpush from "web-push";
import environment from "./environment.js";

webpush.setVapidDetails(
  environment.VAPID_MAILTO,
  environment.VAPID_PUBLIC_KEY,
  environment.VAPID_PRIVATE_KEY,
);

export default webpush;
