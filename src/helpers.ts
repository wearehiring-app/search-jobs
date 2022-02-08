import {Octokit, RestEndpointMethodTypes} from '@octokit/rest'
import markdownToTxt from 'markdown-to-txt'
import slugify from 'slugify'

export async function search(query: string, token?: string) {
  const options = token ? {auth: token} : undefined
  const octokit = new Octokit(options)

  return octokit.rest.search.issuesAndPullRequests({
    q: query
  })
}

export type Page = {
  title: string
  description: string
  content: string
  date: Date
  update: Date
  weight: number
  draft: boolean
  slug: string
  path: string
  aliases: string[]
  inSearchIndex: boolean
  template: string
  taxonomies: Record<string, string[]>
  extra: Record<string, unknown>
}
export type Issue =
  RestEndpointMethodTypes['search']['issuesAndPullRequests']['response']['data']['items'][number]
export function toPage(issue: Issue): Partial<Page> {
  const title = issue.title
  const slug = slugify(`${title.slice(0, 30)}-${issue.id}`, {
    lower: true,
    trim: true
  })
  const content = issue.body || ''
  const description = markdownToTxt(content).slice(0, 100)
  return {
    title,
    description,
    date: new Date(issue.created_at),
    update: new Date(issue.updated_at),
    slug,
    content,
    extra: {
      issue
    }
  }
}
