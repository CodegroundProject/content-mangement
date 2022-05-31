const challengeService = require("../services/challenge.service")

const createChallenge = async (req, res) => {
  const { code, data } = await challengeService.createChallenge(req.body);
  return res.status(code).json(data);
}

const getChallengeById = async (req, res) => {
  const { code, data } = await challengeService.getChallengeById(req.params.id);
  return res.status(code).json(data);
}

const getChallengeTestsById = async (req, res) => {
  const { code, data } = await challengeService.getChallengeTestsById(req.params.id);
  return res.status(code).json(data);
}
const getChallengeByCategorie = async (req, res) => {
  const { code, data } = await challengeService.getChallengeByCategorie(req.body);
  return res.status(code).json(data);
}

module.exports = { createChallenge, getChallengeById, getChallengeTestsById, getChallengeByCategorie }