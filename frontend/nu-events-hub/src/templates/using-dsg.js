import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingDSG = () => (
  <Layout>
    <h1>Static File (DSG) loaded when user lose connection to internet and reloads the page.</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <Seo title="Using DSG" />

export default UsingDSG
