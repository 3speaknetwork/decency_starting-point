import axios from "axios"
import { CommunityInfo, ServerInfo } from "state/types"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'http://65.109.34.169:8000' // TODO: change prod version api link

export const communityCreate = () => `${baseUrl}/api/create-community`