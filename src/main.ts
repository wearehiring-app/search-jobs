import * as core from '@actions/core'
import {getOctokit} from '@actions/github'

import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token')
    const query = core.getInput('query')
    const octokit = getOctokit(token)
    const resp = await octokit.rest.search.issuesAndPullRequests({
      q: query
    })

    if (resp.status !== 200) {
      throw new Error('Bad reponse[search issues]')
    }

    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
