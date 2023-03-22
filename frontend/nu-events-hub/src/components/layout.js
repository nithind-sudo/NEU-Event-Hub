/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./ReusableComponents/Navbar/navbar";
import Footer from "./ReusableComponents/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <Footer></Footer>
    </div>
  )
}

export default Layout
