const mongoose = require("mongoose")
const Challenge = require("../models/Challenge")
const Test = require("../models/Test")
const Input = require("../models/Input")

const createChallenge = async (challenge) => {
  const { name, level, language, description, func_name, inputs, output, tests }
    = challenge
  try {
    const newChallenge = new Challenge({
      name, level, language, description, func_name, output
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
    const tests = await Test.find({ challenge: challengeId }, '-challenge -_id -__v')
    return {
      code: 200,
      data: {
        success: true,
        tests
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

module.exports = { createChallenge, getChallengeById, getChallengeTestsById }