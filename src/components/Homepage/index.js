import Header from '../Header'

import {
  HomeBgContainer,
  HomeCardContainer,
  HomePageHeading,
  HomePageImage,
} from './styledComponents'

const Home = () => (
  <>
    <HomeBgContainer>
      <Header />
      <HomeCardContainer>
        <HomePageHeading>Your Flexibility, Our Excellence</HomePageHeading>
        <HomePageImage
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </HomeCardContainer>
    </HomeBgContainer>
  </>
)

export default Home
