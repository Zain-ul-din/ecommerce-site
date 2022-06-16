import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Intro from '../components/Intro'
import Categories from '../components/categories'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
     <Intro/>
     <Categories/>
     <Footer/>
    </>
  )
}
