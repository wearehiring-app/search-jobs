import {search, toPage} from '../src/helpers'
import {expect, test} from '@jest/globals'

test('search issues', async () => {
  const resp = await search(
    'we are hiring is:issue is:open is:public created:>2021-01-01'
  )

  console.log('total count', resp.data.total_count)
  resp.data.items.forEach(item => {
    const page = toPage(item)
    console.log(page)
  })
})
