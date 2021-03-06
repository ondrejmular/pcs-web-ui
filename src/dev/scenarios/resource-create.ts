import { app } from "dev/app";
import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";

app.libCluster("resource-create", (req, res) => {
  shortcut.libStd({
    code: req.body.resource_id,
    res,
    errors: {
      exist: [
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "ID_ALREADY_EXISTS",
            message: "'exist' already exists",
            payload: { id: "exist" },
          },
          context: null,
        },
      ],
    },
    success: {
      webserver: [
        {
          severity: { level: "INFO", force_code: null },
          message: {
            code: "DEFAULT_INFO",
            message: "Information message from backend",
            payload: { id: "exist" },
          },
          context: null,
        },
        {
          severity: { level: "INFO", force_code: null },
          message: {
            code: "DEFAULT_INFO2",
            message: "Other information message from backend",
            payload: { id: "exist" },
          },
          context: null,
        },
        {
          severity: { level: "WARNING", force_code: null },
          message: {
            code: "DEFAULT_WARNING",
            message: "Warning message from backend",
            payload: { id: "exist" },
          },
          context: null,
        },
      ],
    },
  });
});

shortcut.dashboard([response.clusterStatus.resourceTree]);
