import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["avg<500", "p(95)<1000"],
    checks: ["rate>=0.99"],
  },
};

const BASE_URL = __ENV.BASE_URL || "https://test.k6.io";

export default function () {
  const response = http.get(BASE_URL);

  check(response, {
    "la API responde con status 200": (r) => r.status === 200,
    "la respuesta tarda menos de 1 segundo": (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
