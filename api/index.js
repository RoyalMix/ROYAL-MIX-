const express = require("express");
const router = express.Router();

router.use("/food", require("./food/menu"));
router.use("/health", require("./health/doctors"));
router.use("/supplier", require("./supplier/register"));
router.use("/delivery", require("./delivery/riders"));
router.use("/publicity", require("./publicity/announcements"));
router.use("/ai", require("./ai/ai_core"));
router.use("/rewards", require("./rewards/points"));

module.exports = router;

