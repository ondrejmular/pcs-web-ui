import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import { app } from "dev/app";

shortcut.dashboard([response.clusterStatus.actions]);

app.addConstraintRemote((req, res) => {
  // order
  if (req.body.c_type === "ord" && req.body.res_id === "fail") {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }

  if (req.body.c_type === "ord") {
    res.send("Successfully added constraint");
    return;
  }

  // colocation
  if (req.body.c_type === "col" && req.body.res_id === "fail") {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }

  if (req.body.c_type === "col") {
    res.send("Successfully added constraint");
    return;
  }

  // location
  if (req.body.score > 100) {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }
  res.send("Successfully added constraint");
});

app.removeConstraintRemote((req, res) => {
  if (req.body.constraint_id === "cli-prefer-A") {
    res.status(400).send("Error removing constraint: cli-prefer-A");
    return;
  }
  res.send(`Constraint ${req.body.constraint_id} removed`);
});

app.removeConstraintRuleRemote((req, res) => {
  if (req.body.rule_id === "cli-prefer-A-1") {
    res.status(400).send("Error removing constraint rule: cli-prefer-A-1");
    return;
  }
  res.send(`Constraint rule ${req.body.constraint_id} removed`);
});

app.addConstraintRuleRemote((req, res) => {
  if (req.body.score > 100) {
    res
      .status(400)
      .send("Error adding constraint: Error: something wrong in pcs command");
    return;
  }
  res.send("Successfully added constraint");
});

app.libCluster("constraint-order-create-with-set", (req, res) => {
  const id = req.body.constraint_options.id ?? "ok";
  shortcut.libStd({
    code: id,
    res,
  });
});

app.libCluster("constraint-ticket-create-with-set", (req, res) => {
  const id = req.body.constraint_options.id ?? "ok";
  shortcut.libStd({
    code: id,
    res,
  });
});

app.libCluster("constraint-colocation-create-with-set", (req, res) => {
  const id = req.body.constraint_options.id ?? "ok";
  shortcut.libStd({
    code: id,
    res,
  });
});

app.libCluster("constraint-ticket-create", (req, res) => {
  const id = req.body.ticket_key ?? "ok";
  shortcut.libStd({
    code: id,
    res,
  });
});
