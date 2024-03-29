const mongoose = require("mongoose")
const Challenge = require("../models/Challenge")
const Test = require("../models/Test")
const Input = require("../models/Input")

const getAll = async () => {
  return {
    code: 200,
    data: {
      success: true,
      data: await Challenge.find({})
    }
  }
}

const createChallenge = async (challenge) => {
  const { name, level, language, description, func_name, categorie, inputs, output, tests }
    = challenge
  try {
    const newChallenge = new Challenge({
      name, level, language, description, func_name, output, categorie,
    })
    const success = await newChallenge.save()

    if (!success) return {
      code: 400,
      data: {
        success: false,
        msg: "can't create the challenge"
      }
    }
    inputs.forEach((input, index) => {
      inputs[index] = { ...input, challenge: newChallenge._id }
    });

    const successInputs = await Input.insertMany(inputs)
    if (!successInputs) return {
      code: 400,
      data: {
        success: false,
        msg: "can't save inputs"
      }
    }

    tests.forEach((test, index) => {
      tests[index] = { ...test, challenge: newChallenge._id }
    })

    const successTests = await Test.insertMany(tests)

    if (!successTests) return {
      code: 400,
      data: {
        success: false,
        msg: "can't save tests"
      }
    }

    return {
      code: 201,
      data: {
        success: true,
        msg: "challenge created successfuly",
        challenge: newChallenge
      }
    }

  } catch (e) {
    console.log(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}
const getChallengeById = async (challengeId) => {
  try {
    let challenge = await Challenge.findById(challengeId, '-__v')

    if (!challenge) return {
      code: 400,
      data: {
        success: false,
        msg: "challenge doesn't exist"
      }
    }

    const inputs = await Input.find({ challenge: challengeId }, '-_id -challenge -__v')
    const tests = await Test.find({ challenge: challengeId }, '-challenge -_id -__v')
    return {
      code: 200,
      data: {
        success: true,
        challenge: { challenge, inputs, tests }
      }
    }
  } catch (e) {
    console.log(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}
const getChallengeTestsById = async (challengeId) => {
  try {
    const challenge = await Challenge.findById(challengeId)

    if (!challenge) return {
      code: 400,
      data: {
        success: false,
        msg: "challenge doesn't exist"
      }
    }
    const tests = await Test.find({ challenge: challengeId }, '-__v')
    return {
      code: 200,
      data: {
        success: true,
        func_name: challenge.func_name,
        tests,
      }
    }
  } catch (e) {
    console.log(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}

const getChallengeByCategorie = async (categorie) => {
  try {
    const { categorie: targetCategorie } = categorie;
    const challenges = await Challenge.find({ categorie: targetCategorie });
    const index = Math.floor(Math.random() * challenges.length)
    const inputs = await Input.find({ challenge: challenges[index]._id }, '-_id -challenge -__v')
    const tests = await Test.find({ challenge: challenges[index]._id }, '-challenge -_id -__v')

    return {
      code: 200,
      data: {
        challenge: { challenge: challenges[index], inputs, tests }
      }
    }
  } catch (e) {
    console.error(e);
    return {
      code: 500,
      data: {
        success: false,
        msg: "server error"
      }
    }
  }
}

module.exports = { createChallenge, getChallengeById, getChallengeTestsById, getChallengeByCategorie, getAll }