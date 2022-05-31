const router = require("express").Router();
const challengeController = require("../../controllers/challenge.controller")

router.post("/create", challengeController.createChallenge)
router.get("/:id", challengeController.getChallengeById)
router.get("/tests/:id", challengeController.getChallengeTestsById)
router.post("/", challengeController.getChallengeByCategorie)

module.exports = router;