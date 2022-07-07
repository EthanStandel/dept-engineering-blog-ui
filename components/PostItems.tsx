import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

import { GhostPostOrPage, GhostPostsOrPages, GhostSettings } from '@lib/ghost'

import { FilterTags } from '@components/FilterTags'
import { PostCard } from '@components/PostCard'
import { FirstPost } from '@components/FirstPost'
interface PostItemsProps {
  settings: GhostSettings
  posts: GhostPostsOrPages
  isHome?: boolean
}

export const PostItems = ({ settings, posts, isHome }: PostItemsProps) => {
  const firstRow: React.ReactNode[] = []
  const rows: GhostPostOrPage[][] = []
  const { asPath } = useRouter()

  if (!posts.length) {
    return null
  }

  firstRow.push(<FirstPost key={0} {...{ settings, post: posts[0], isHome }} />)

  if (isHome || asPath.indexOf('/tag') >= 0) {
    firstRow.push(
      <div className="grid-wrapper" key="filter-tags">
        <Grid className="grid-inner" container>
          <Grid item xs={12}>
            <FilterTags
              currentTag={asPath.split('/').slice(-1)[0] || ''}
              tags={['Platforms', 'Teams', 'Process', 'People']}
            />
          </Grid>
        </Grid>
      </div>
    )
  }

  let newPosts: GhostPostOrPage[] = posts.slice(1)
  let breakOn: number = 2

  while (newPosts.length) {
    rows.push(newPosts.slice(0, breakOn))
    newPosts = newPosts.slice(breakOn)
    breakOn = breakOn === 2 ? 3 : 2
  }

  const mainRows = rows.map((row, i) => (
    <div className="grid-wrapper" key={i + 1}>
      <Grid className="grid-inner" columnSpacing={{ xs: 0, md: 3 }} container>
        {row.map((post, n) => (
          <Grid
            key={`${i + 1} ${n}`}
            item
            xs={12}
            md={row.length === 1 ? 12 : row.length === 3 ? 4 : 6}
          >
            <PostCard {...{ settings, post }} />
          </Grid>
        ))}
      </Grid>
    </div>
  ))

  return <>{firstRow.concat(mainRows)}</>
}
