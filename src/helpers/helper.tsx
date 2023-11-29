
import numeral from 'numeral'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'

numeral.zeroFormat('0')
numeral.nullFormat('N/A')

const helper = {
  getSubDomain: () => {
    const router = useRouter()
    const subDomain = router?.query?.subDomain as string
    return !isEmpty(subDomain) ? subDomain : ""
  },
}

export default helper

