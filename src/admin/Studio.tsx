import {Studio} from 'sanity'
import config from '../../sanity.config'

export default function AdminStudio() {
  return <Studio config={config} />
}